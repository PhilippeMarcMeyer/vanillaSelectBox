
# vanillaSelectBox v1.0.5

npm i vanillaselectbox

## vanillaSelectBox : v1.05 : setValue() bug correction on single mode. You could not set the value
if you select all the elements when the list is filtered by the textBox it will put the value All to the placeholder even when it does not have all the values selected, if you close and open again the select you will notice that not all the values are checked and the placeholder says All

## New : Possibility to change the dropdown tree and change the remote search function

### A nice select/multiselect ui with no dependency and two levels support thru optgroups

The idea is to use a mundane SELECT element, hide it and provide a nice drop-down instead. But the data comes from the original element and this one is updated with choices made and still receives a change event. An exception is the remote init() and the remote search() functions (optional) added with v 0.75 but they require at least an empty SELECT element and the result is still provided in the original element. Feel free to ask more explanations in the discussions tab. See you soon

### New : you can use the discussions page to help me improve this little tool or even suggest other plugins

### vanillaSelectBox is not currently in v1+, please test it carefully before using it in production (interactions with other plugins, css) and be kind enough to report any bug to me so I can improve it. 


#### Find examples at the end of the readme file !

#### Check my todo list at the very bottom !

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/vanillaSelectBox.png)

Demo classic : https://philippemarcmeyer.github.io/vanillaSelectBox/index.html?v=1.05

Demo remote  : https://philippemarcmeyer.github.io/vanillaSelectBox/ajaxDemo.html?v=1.05

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
* translations : { "all": "Tous", "item":"élément","items": "éléments","selectAll":"Tout sélectionner","clearAll":"Effacer"}
* search : true/false, to provide a search input text to reduce the list
* placeHolder : well that's a placeholder !
* stayOpen : true/false. defaut is false : that's a drop-down. Set it to true and that"s a list (>= v 0.25)
* disableSelectAll : true/false. defaut is false : add a checkbox select all / clear all
* maxSelect : integer. set a maximum in the number of selectable options. CheckAll/uncheckAll is then disabled
* maxOptionWidth : integer,set a maximum width for each option for narrow menus
* itemsSeparator : string, to change the default "," item separator showing in the button

### New options : Remote 
* remote : 
  "remote": { //object => the search input searches remote thanks to the user defined handler onSearch
	"onInit": getData,// no function here make init comes from SELECT element
	"onInitSize": 8,//  limits the number of data lines for init
	"onSearch": getData // no function here make search local
}

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

v1.05 : setValue() bug correction on single mode. You could not set the value

v1.04 : select all issue fixed by https://github.com/arthur911016 

v1.03 : getResult() an new fonction to get the selected values in an array

v1.02 : Adding 2 new options "itemsSeparator" to change the default "," item separator showing in the button and translations.item to show the item in singular if there is only one.

v1.01 : Removing useless code line 550,551 issue 71 by chchch

v1.00 : Due to demand : added a package.json file and switched to 1.0.0 in preparation to an upload to npm

v0.78 : Stop using inline styles in the main button. You can steal use keepInlineStyles:true to use the legacy behaviour

v0.77 : Work on place holder with bastoune help => still seems to lose placeholder value on multiple dropdown checkall

v0.76 : Possibility to change the dropdown tree and change the remote search function + correcting empty() function

v0.75 : Remote search ready + local search modification : when a check on optgroup checks children only 
        if they not excluded from search.

v0.72 : Remote search (WIP) bugfix [x] Select all duplicated

v0.71 : Remote search (WIP) better code => the remote search user deined function must return a promise

v0.70 : remote search (WIP) can be tested. works only on 1 level menus (not optgroups)

v0.65 : Two levels: bug fix : groups are checked/unchecked when check all/uncheck all is clicked

v0.64 : Two levels: groups are now checkable to check/uncheck the children options 

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

Single select menu :

```
       <select id="singleTest">
            <option value="Abarth" >Abarth</option>
            <option value="Alfa Romeo">Alfa Romeo</option>
            <option value="Alpine">Alpine</option>
            <option value="Aston Martin" >Aston Martin</option>
            <option value="Audi" >Audi</option>
            <option value="Bentley" >Bentley</option>
            <option value="BMW" >BMW</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Citroën">Citroën</option>
            <option value="Cupra">Cupra</option>
            <option value="DACIA">Dacia</option>
        </select>
	
let selectCars = new vanillaSelectBox(
	"#singleTest",
	    {
	    	"placeHolder":"Choose your car",
		translations: { "all": "All", "items": "Cars" } 
	    });

```
Multiple select menu :
note the "multiple" attribute to ge en multiple select menu
and the size="2" to replace the comma delimited string of selected items by "3 items" where more than size items are selected
(here items is translated to Cars)
```
       <select id="multiTest" multiple size="2">
            <option value="Abarth" >Abarth</option>
            <option value="Alfa Romeo">Alfa Romeo</option>
            <option value="Alpine">Alpine</option>
            <option value="Aston Martin" >Aston Martin</option>
            <option value="Audi" >Audi</option>
            <option value="Bentley" >Bentley</option>
            <option value="BMW" >BMW</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Citroën">Citroën</option>
            <option value="Cupra">Cupra</option>
            <option value="DACIA">Dacia</option>
        </select>
	
let selectCars = new vanillaSelectBox(
	"#multiTest",
	    {
		"placeHolder":"Choose up to 3 cars",
		"maxSelect":3,
		"translations": { "all": "All", "items": "Cars" } 
	    });

```

Two levels : just use optgroup tags to make it two levels

```
        <div> 
            <label for="dino-select">Choose dinosaurs :</label>
            <select id="dino-select" multiple size="3" >
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

maxSelect option : limits the number of options you can select

```
let selectCars = new vanillaSelectBox("#demoShort",
    {"maxSelect": 4, 
    "maxHeight": 200,
    "search": true,
    translations: { "all": "All", "items": "Cars" } 
    });
```


maxOptionWidth option : limits the width of the menu options to make the menu more narrow using ellipis

```
let selectCars = new vanillaSelectBox("#demoShort",
    {"maxOptionWidth":70,
    "maxHeight": 200,
    "search": true,
    translations: { "all": "All", "items": "Cars" } 
});
```

Remote search example :

```
<select id="demoM1" multiple="true" size="3">
</select>

let selectDemoM1 = new vanillaSelectBox("#demoM1",
    {
        "maxHeight": 300,
        "search": true,
        "placeHolder" : "search to load more data",
        "translations": { "all": "everybody", "items": "people" },
        "remote": {
            "onSearch": doSearch, // used fro search and init
            "onInitSize": 10, // if > 0 onSearch is used for init to populate le select element with the {onInitSize} first elements
        }
    }
);

function doSearch(what, datasize) {
      let valueProperty = "id";
      let textProperty = "name";
      return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.overrideMimeType("application/json");
          xhr.open('GET','./data.json', true);
          xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                  var data = JSON.parse(xhr.response);

                  if (what == "" && datasize != undefined && datasize > 0) { // for init to show some data
                      data = data.slice(0, datasize);
                      data = data.map(function (x) {
                          return {
                              value: x[valueProperty],
                              text: x[textProperty]
                          }
                      });
                  } else {
                      data = data.filter(function (x) {
                          let name = x[textProperty].toLowerCase();
                          if (name.indexOf(what.toLowerCase()) != -1)
                              return {
                                  value: x[valueProperty],
                                  text: x[textProperty]
                              }
                      });
                  }
                  resolve(data);
              } else {
                  reject({
                      status: this.status,
                      statusText: xhr.statusText
                  });
              }
          };
          xhr.onerror = function () {
              reject({
                  status: this.status,
                  statusText: xhr.statusText
              });
          };
          xhr.send();
      });
  }

```

### TODO

- ~~Remote search and loading : manage 2 levels dropdowns~~ DONE in 0.75
- Add a getResult() function instead of just getting it from the DOM hidden select element
- ~~Add more than levels via optgroups~~ NO don't over complicate this plugin, make another
- ~~Maybe keep the tree internaly as an objet and keeping the original select as an option but not mandatory anymore~~ NO the select element is the main idea of this plugin
- Better alternate css support => first of all change css icons with images

