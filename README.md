# vanillaSelectBox
### A nice select/multiselect ui with no dependency

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/vanillaSelectBox.png)

Demo : https://philippemarcmeyer.github.io/vanillaSelectBox/

#### Transform an HTML select into a selectBox dropdown
##### the select is hidden and the chosen value(s) is/are available in the source select

```
let selectBox = new vanillaSelectBox("#brands",{"maxHeight":200});
```
* param 1 : css selector of a normal select element
* param 2 : options 

###available options : 
* maxWidth : for the UI if you don't want the title to expand to much to the right
* maxHeight : the maxHeight set a scroll when there are too many items 
* translations : { "all": "every cars", "items": "cars" }
* search : false (for the moment, will come soon)
* placeHolder : well that's a placeholder !

##### Todo : search box

##### History :
v 0.10 : functional plugin for both single and multiple selects, without search box for the moment

v 0.02 : added dispatch change event to select + nicer check mark

v 0.01 : first commit => basics for a single select box + the Dom is cleaned if you init twice
