> This is a doc to record some colors we use in the application
```
const cardTypeColors = {
  GENERAL: "transparent",
  DAILY: "#FFE0B2", 
  ONETIME: "#B3E5FC", 
  PERIODIC: "#C8E6C9", 
};

```

color of the chip

```
<StyledChip 
label={`${cardUser.iteration + 1}/${cardUser.card.total}`} 
style={{ backgroundColor: '#E6F7FF', position: 'absolute', marginTop: 15, right:100 }} 
/>
                

```
