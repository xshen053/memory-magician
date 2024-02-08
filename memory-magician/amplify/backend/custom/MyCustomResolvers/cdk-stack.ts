// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Fn, Stack, StackProps, CfnParameter, aws_appsync as appsync } from 'aws-cdk-lib';                 // core constructs
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';

//import * as iam from 'aws-cdk-lib/aws-iam';
//import * as sns from 'aws-cdk-lib/aws-sns';
//import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
//import * as sqs from 'aws-cdk-lib/aws-sqs';

const requestVTL = `
## [Start] Initialization default values. **
$util.qr($ctx.stash.put("defaultValues", $util.defaultIfNull($ctx.stash.defaultValues, {})))
#set( $createdAt = $util.time.nowISO8601() )
#set($UserCardsArray = [])
#foreach($item in \${ctx.args.usrcards})
  $util.qr($item.put("id", $util.defaultIfNullOrBlank($item.id, $util.autoId())))
  $util.qr($item.put("createdAt", $util.defaultIfNull($item.createdAt, $createdAt)))
  $util.qr($item.put("updatedAt", $util.defaultIfNull($item.updatedAt, $createdAt)))
  $util.qr($item.put("__typename", "UserCards"))
  $util.qr($UserCardsArray.add($util.dynamodb.toMapValues($item)))
#end
## [End] Initialization default values. **
$util.toJson( {
  "version": "2018-05-29",
  "operation": "BatchPutItem",
  "tables": {
    "UserCards-yipm7oruzjesxinjxlbzlukqbe-dev": $UserCardsArray
  }
} )
`;
const responseVTL = `
## [Start] ResponseTemplate. **
#if( $ctx.error )
  $util.error($ctx.error.message, $ctx.error.type)
#else
  $util.toJson($ctx.result.data.UserCards-yipm7oruzjesxinjxlbzlukqbe-dev)
#end
## [End] ResponseTemplate. **
`;

export class cdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [{
        category: "api",
        resourceName: "memorymagician"
      }]
    );

    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    
    // Example 1: Set up an SQS queue with an SNS topic 

    /*
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `sqs-queue-${amplifyProjectInfo.projectName}`;
    const queue = new sqs.Queue(this, 'sqs-queue', {
      queueName: `${sqsQueueResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇create sns topic
    
    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, 'sns-topic', {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
    */

    // Example 2: Adding IAM role to the custom stack 
    /*
    const roleResourceNamePrefix = `CustomRole-${amplifyProjectInfo.projectName}`;
    
    const role = new iam.Role(this, 'CustomRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: `${roleResourceNamePrefix}-${cdk.Fn.ref('env')}`
    }); 
    */

    // Example 3: Adding policy to the IAM role
    /*
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: [topic.topicArn],
      }),
    );
    */

    // Access other Amplify Resources 
    /*
    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [
        {category: <insert-amplify-category>, resourceName: <insert-amplify-resourcename>},
      ]
    );
    */
    const resolver = new appsync.CfnResolver(this, 'custom-resolver', {
      // apiId: retVal.api.new.GraphQLAPIIdOutput,
      // https://github.com/aws-amplify/amplify-cli/issues/9391#event-5843293887
      // If you use Amplify you can access the parameter via Ref since it's a CDK parameter passed from the root stack.
      // Previously the ApiId is the variable Name which is wrong , it should be variable value as below
      apiId: Fn.ref(retVal.api.memorymagician.GraphQLAPIIdOutput),
      fieldName: 'batchCreateUserCards',
      typeName: 'Mutation', // Query | Mutation | Subscription
      requestMappingTemplate: requestVTL,
      responseMappingTemplate: responseVTL,
      dataSourceName: 'UserCards' // DataSource name
    });
    
  }
}
