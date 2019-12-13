# vanillaSelectBox
### A nice select/multiselect ui with no dependency

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/vanillaSelectBox.png)

Demo : https://philippemarcmeyer.github.io/vanillaSelectBox/

### Transform an HTML select into a selectBox dropdown
#### the select is hidden and the chosen value(s) is/are available in the source select

```
let selectBox = new vanillaSelectBox("#brands",{"maxHeight":200,search:true});
```
* param 1 : css selector of a normal select element
* param 2 : options 

### Available options : 
* maxWidth : for the UI if you don't want the title to expand to much to the right
* maxHeight : the maxHeight set a scroll when there are too many items 
* translations : { "all": "every cars", "items": "cars" }
* search : true/false, to provide a search input text to reduce the list
* placeHolder : well that's a placeholder !
* stayOpen : true/false. defaut is false : that's a drop-down. Set it to true and that"s a list (>= v 0.25)

### Automatic options :
* single or multiple choices : depends on the "multiple" attribute that you put in the select code 
* size : if you set a multiple attribute and a size attribute in the select (for instance 3) :
  * the title zone will enumerate the chosen values as a comma separated string until it reaches "size"
  * Above it will show "x items" or "x" + whatever you put in the translations.items key
  * If all the items are selected, it will show "all" or whatever you put in the translations.items all

```
<select id="brands" multiple size="3">
```
### Available commands :
* empty()
* setValue([] || '' || 'all') => the multiple uses an array of values or a comma separated string or the string 'all'
* disable()
* enable()
* destroy()

```
setValues('brandsMulti',['Lamborghini','Land Rover'])
```
#### History :

v 0.30 : The menu stops moving around on window resize and scroll + z-index in order of creation for multiple instances

v 0.26 : Corrected bug in stayOpen mode with disable() function

v 0.25 : New option stayOpen, and the dropbox is no longer a dropbox but a nice multi-select
 
 ![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/stayOpen.jpg)
 
v 0.22 : Migrating the function to vanillaSelectBox prototype => several instances of vanillaSelectBox() but 1 set of functions in memory
 
v 0.21 : IE 11 compatibility

v 0.20 : working selectBox both single and multiple choices, with search-box !

v 0.10 : functional plugin for both single and multiple selects, without search box for the moment

v 0.02 : added dispatch change event to select + nicer check mark

v 0.01 : first commit => basics for a single select box + the Dom is cleaned if you init twice

