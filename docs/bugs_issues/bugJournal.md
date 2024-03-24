> A doc about bugs I met during the development

# Table of Contents

- [API Efficiency](#linkedlist)
- [useEffect](#useEffect)
- [graphql resolver](#resolver)

# API Efficiency

If the dataset is large, consider enhancing the GraphQL API to allow for more specific queries, reducing the need for client-side filtering.

# When trying to create mutliple queries at once


# many to many aws 语法


# many to one

有些系统设计成many-to-many不影响，但会简化一些步骤

many-to-one 是many-to-many的子集


# 数据库的设计

如果设计成原来的样子，结果就是

- 第一遍先查出所有的card
- 然后第二遍card再查所有的review date

但如果变成many-to-many

- 直接查jointable，通过userID就可以获得所有的card和reviewdate

# how to query using non-primary field?

- add @index in table in schema.graphql
e.g.

```graphql
type UserCards @model {
  id: ID!
  userID: ID! @index(name: "byUser", sortKeyFields: ["cardID"])
  cardID: ID! @index(name: "byCard", sortKeyFields: ["userID"])
  user: User @belongsTo(fields: ["userID"])
  card: Card @belongsTo(fields: ["cardID"])
  number: Int          # the ith time to review
  isReviewed: Boolean 
  reviewDuration: Int
  reviewDate: AWSDateTime
}
```

- query.js generates corresponding query
- can be directly use!





# some apis are unexpected called twice (race condition in development mode)

Strict Mode in React:

If your application is running in React's strict mode (<React.StrictMode>), certain lifecycle methods including useEffect are intentionally invoked twice in development mode to help find problems in your code. This does not happen in production builds. If this is the case, the function being called twice should only be an issue during development.

## Bug2

```

I have the same issue stuck forever in the loop of

🛑 ["Index: 1 State: {\"preRollback\":\"previousDeploymentReadyCheck\"} Message: Resource is not in the state stackUpdateComplete"]

```

solution


i found the solution. I got the same error due to want to change the primary key, so did what they amplify told me, to use --allow-destructive-graphql-schema-updates , heck it failed, then i just delete the tables in the schema ( the one i want to change the primary key), push to the cloud, then after it finished, put back the table, push again, it worked

# useEffect


when using useEffect to call function?

`setState` doesn't function immediately


## why reviewDates are both []?

```Javascript
  console.log(reviewDates)
    if (reviewDates.length === 0) {
      const rd = generateAllReviewDates(todayDate)
      console.log("print")
      setReviewDates(rd)
    }
    console.log(reviewDates) why reviewDates is empty
```


> In React, state updates using the useState hook are asynchronous. This means when you call setReviewDates(rd), the state reviewDates doesn't update immediately. Instead, the update is scheduled, and the new value will be available on the next render of the component.


# After add a memory, if directly mark it, it will error


`getOneCardUserFromUserIDCardID` this function has problem

## Solution 
still need use nextToken to make sure fetch all the data

# Bug

```
"The conditional request failed (Service: DynamoDb, Status Code: 400, Request ID: NRERAH310V1E9A9O00GKTNPPF3VV4KQNSO5AEMVJF66Q9ASUAAJG)"
path
```

when doing a mutation

## Solution

didn't pass the correct id, I pass a cardid instead of a usercardid

it doesn't exist in the table!! after I passed the correct id, it works



# Resolver

Argument of type 'this' is not assignable to parameter of type 'Construct


## problem
> cdk v1, v2 mismatch


```js
// V2
import { Construct } from 'constructs'; // construct is in a separate package
import { Stack, StackProps, aws_s3 as s3 } from 'aws-cdk-lib'; // common package for stable construct
import * as appsync from '@aws-cdk/aws-appsync-alpha'  // alpha constructs in separate packages

// V1 - separate packages core and for each service
import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
```

正确方法
```
// The code below shows an example of how to instantiate this type.
// The values are placeholders you should change.
import { aws_appsync as appsync } from 'aws-cdk-lib';
const cfnResolver = new appsync.CfnResolver(this, 'MyCfnResolver', {
  apiId: 'apiId',
  fieldName: 'fieldName',
  typeName: 'typeName',

  // the properties below are optional
  cachingConfig: {
    ttl: 123,

    // the properties below are optional
    cachingKeys: ['cachingKeys'],
  },
  code: 'code',
  codeS3Location: 'codeS3Location',
  dataSourceName: 'dataSourceName',
  kind: 'kind',
  maxBatchSize: 123,
  pipelineConfig: {
    functions: ['functions'],
  },
  requestMappingTemplate: 'requestMappingTemplate',
  requestMappingTemplateS3Location: 'requestMappingTemplateS3Location',
  responseMappingTemplate: 'responseMappingTemplate',
  responseMappingTemplateS3Location: 'responseMappingTemplateS3Location',
  runtime: {
    name: 'name',
    runtimeVersion: 'runtimeVersion',
  },
  syncConfig: {
    conflictDetection: 'conflictDetection',

    // the properties below are optional
    conflictHandler: 'conflictHandler',
    lambdaConflictHandlerConfig: {
      lambdaConflictHandlerArn: 'lambdaConflictHandlerArn',
    },
  },
});
```

```
// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Fn, Stack, StackProps, CfnParameter, aws_appsync as appsync } from 'aws-cdk-lib';                 // core constructs
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';

```

经验：每个function，直接google在哪个包里面


# naming problem

```
wrong: apiId: Fn.ref(retVal.api.memorymagician-dev.GraphQLAPIIdOutput),

correct: apiId: Fn.ref('retVal.api.memorymagician-dev.GraphQLAPIIdOutput'),
```

# solution

https://stackoverflow.com/questions/58168051/aws-amplify-resource-is-not-in-the-state-stackupdatecomplete

```
Just to give some background about this error - what does Resource is not in the state stackUpdateComplete actually mean?

Well basically Amplify is telling you that one of the stacks in your app did not deploy correctly, but it doesn't know why (which is remarkably unhelpful, but in fairness it's deploying a lot of potentially complex resources).

This can make diagnosing and fixing the issue really problematic, so I've compiled this kind of mental checklist that I go through to fix it. Each of the techniques will work some of the time, but I don't think there are any that will work all of the time. This list is not intended to help you diagnose what causes this issue, it's literally just designed to get you back up and running.

The fast options (will solve most problems)
Check the AWS Console! Sometimes the amplify-cli will show an error, but it actually did what you asked it to in the cloud. Before proceeding, always check to make sure the error was actually fatal.
If you're sure your deployment is definitely failing, then next step is to MAKE A BACKUP OF YOUR LOCAL WORK before proceeding with any of the following steps.
Firstly, you can try to restore your env from the one in the last working deployment in the cloud by running amplify env pull --restore.
Try running amplify push --iterative-rollback. It's supposed to roll your environment back to the last successful deployment, but tbh it rarely works.
Try running amplify push --force. Although counter-intuitive, this is actually a rollback method. It basically does what you think --iterative-rollback will do, but works more frequently.
In the AWS console, go to the deployment bucket for your environment (the bucket will be named amplify-${project_name}-${environment_name}-${some_random_numbers}-deployment). If there is a file called deployment-state.json, delete it and try amplify push again from the CLI.
If you are working in a team of more than one developer, or have your environment in several different repos locally, or across multiple different machines, your amplify/team-provider-info.json file might be out of sync. Usually this is caused by the environment variable(s) in an Amplify Lambda function being set in one of the files but not in another. The resolution will depend on how out of sync these files are, but you can normally just copy the contents of the last working team-provider-info.json file across to the other repo (from where the deployment is failing) and run the deployment again. However, if you've got multiple devs/machines/repos, you might be better off diffing the files and checking where the differences are.
If any of these worked, you can then re-add the any changes that were lost by diffing your repo again the backup you made and copying the changes back over.
```
