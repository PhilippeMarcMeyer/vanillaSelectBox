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

### Available options : 
* maxWidth : for the UI if you don't want the title to expand to much to the right
* maxHeight : the maxHeight set a scroll when there are too many items 
* translations : { "all": "every cars", "items": "cars" }
* search : false (for the moment, will come soon)
* placeHolder : well that's a placeholder !

### Automatic options :
* single or multiple choices : depends on the "multiple" attribute that you put in the select code 
* size : if you set a multiple attribute and a size attribute in the select (for instance 3) :
** the title zone will enumerate the chosen values as a comma separated string until it reaches "size"
** Above it will show "x items" or "x" + whatever you put in the translations.items key
** If all the items are selected, it will show "all" or whatever you put in the translations.items all

```
let selectBox = new vanillaSelectBox("#brands",{"maxHeight":200});
```
##### Todo : search box

##### History :
v 0.10 : functional plugin for both single and multiple selects, without search box for the moment

v 0.02 : added dispatch change event to select + nicer check mark

v 0.01 : first commit => basics for a single select box + the Dom is cleaned if you init twice
