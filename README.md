
# vanillaSelectBox v0.63 

### A nice select/multiselect ui with no dependency and two levels support thru optgroups

### New : you can use the discussions page to help me improve this little tool or even suggest other plugins

### vanillaSelectBox is not currently in v1+, please test it carefully before using it in production (interactions with other plugins, css) and be kind enough to report any bug to me so I can improve it. 

I think one improvement would be to integrate the css as style tags because there are still css interferences between the document and vanillaSelectBox

What do you think ?

last change : Two levels: one click on the group selects / unselects children


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
* minWidth : for the UI if you don't want the title to be to narrow (combining both, you've got a fixed width)
* maxHeight : the maxHeight set a scroll on the menu when there are too many items 
* translations : { "all": "Tous", "items": "éléments","selectAll":"Tout sélectionner","clearAll":"Effacer"}
* search : true/false, to provide a search input text to reduce the list
* placeHolder : well that's a placeholder !
* stayOpen : true/false. defaut is false : that's a drop-down. Set it to true and that"s a list (>= v 0.25)
* disableSelectAll : true/false. defaut is false : add a checkbox select all / clear all
* maxSelect : integer. set a maximum in the number of selectable options. CheckAll/uncheckAll is then disabled
* maxOptionWidth : integer,set a maximum width for each option for narrow menus

### Automatic options :
* single or multiple choices : depends on the "multiple" attribute that you put in the select code 
* size : if you set a multiple attribute and a size attribute in the select (for instance 3) :
  * the title zone will enumerate the chosen values as a comma separated string until it reaches "size"
  * Above it will show "x items" or "x" + whatever you put in the translations.items key
  * If all the items are selected, it will show "all" or whatever you put in the translations.items all

```
<select id="brands" multiple size="3">
```
#### Result :

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/sizeMatters.png)


### Available commands :
* empty()
* setValue([] || '' || 'all') => the multiple uses an array of values or a comma separated string or the string 'all'
* disable()
* enable()
* destroy()
* enableItems([] || '') => array of values or comma delimited list
* disableItems([] || '') => array of values or comma delimited list
```
selectBox = new vanillaSelectBox("#brandsOne", { "maxHeight": 200, "search": true, "placeHolder": "Choose a brand..." });
selectBox.disableItems(['Lamborghini','Land Rover']);
```
#### History : 

v0.63 : Two levels: one click on the group selects / unselects children

v0.62 : New option: maxOptionWidth set a maximum width for each option for narrow menus (ellipsis troncature)

v0.61 : New option: maxSelect, set a maximum to the selectable options in a multiple choice menu

v0.60 : Two levels: optgroups are now used to show two level dropdowns 

 ![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/twoLevels.jpg)


v0.59 : Bug fix : search box was overlapping first item in single selects

v0.58 : Bug fixes

v0.57 : Bug fix (minWidth option not honored)

v0.56 : The multiselect checkboxes are a little smaller, maxWidth option is now working + added minWidth option as well
        The button has now a style attribute to protect its appearance 

v0.55 : All attributes from the original select options are copied to the selectBox element.
        Excepted => "selected","disabled","data-text","data-value","style"
        
v0.54 : if all the options of the select are selected by the user then the check all checkbox is checked.

v0.53 : if all the options of the select are selected then the check all checkbox is checked => see demo "select all test"

v0.52 : Better support of select('all') => command is consistent with checkbox and selecting / deselecting while searching select / uncheck only the found items

v0.51 : Translations for select all/clear all + minor css corrections + don't select disabled items

v0.50 : PR by https://github.com/jaguerra2017 adding a select all/clear all check button + optgroup support !

v 0.41 : Bug corrected, the menu content was misplaced if a css transform was applied on a parent

v 0.40 : A click on one selectBox close the other opened boxes

v 0.35 : You can enable and disable items. The already disble options of the select are also used at init time.

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

## Examples

Two levels :

```
        <div> 
            <label for="dino-select">Choose dinosaurs :</label>
            <select id="dino-select" multiple="" size="3" >
                <optgroup label="Theropods">
                    <option>Tyrannosaurus</option>
                    <option>Velociraptor</option>
                    <option>Deinonychus</option>
                </optgroup>
                <optgroup label="Sauropods">
                    <option>Diplodocus</option>
                    <option>Saltasaurus</option>
                    <option>Apatosaurus</option>
                </optgroup>
            </select>
        </div>
        
<script>
            
// How to get the result from the original select tag :
            
let chosenDinos = [];

function getValues(id) {
let result = [];
let collection = document.querySelectorAll("#" + id + " option");
collection.forEach(function (x) {
	if (x.selected) {
		result.push(x.value);
	}
});
return result;
}

let selectDinos = new vanillaSelectBox("#dino-select",
    {"maxHeight": 300,
    "search": true,
    translations: { "all": "All", "items": "Dinos" } 
    });

document.getElementById("dino-select").addEventListener("change", function (e) {
	chosenDinos = getValues("dino-select");
	console.log(chosenDinos);
});
      
</script>
        

```

maxSelect option :

```
let selectCars = new vanillaSelectBox("#demoShort",
    {"maxSelect":4, 
    "maxHeight": 200,
    "search": true,
    translations: { "all": "All", "items": "Cars" } 
    });
```


maxOptionWidth option :

```
let selectCars = new vanillaSelectBox("#demoShort",
    {"maxOptionWidth":70,
    "maxHeight": 200,
    "search": true,
    translations: { "all": "All", "items": "Cars" } 
});
```
