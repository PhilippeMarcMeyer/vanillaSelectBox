# vanillaSelectBox
### A nice select/multiselect ui

![screen shot](https://raw.githubusercontent.com/PhilippeMarcMeyer/vanillaSelectBox/master/vanillaSelectBox.png)

Demo : https://philippemarcmeyer.github.io/vanillaSelectBox/

ex : let selectBox = new vanillaSelectBox("#brands",{"maxHeight":200});

v0.02 : Takes a mundane select and transforms it into a nice select box à la Bootstrap

param 1 : css selector of a normal select element

param 2 : options => for the present time only maxWidth & maxHeight (integers)

the maxWidth is for the UI (it will be useful for the multiple select in the future)

the maxHeight set a scroll when there are too many items 


Todo : multi-select, search box + empty, set actions, destroy 

History :
v 0.02 : added dispatch change event to select + nicer check mark

v 0.01 : first commit => basics for a single select box + the Dom is cleaned if you init twice
