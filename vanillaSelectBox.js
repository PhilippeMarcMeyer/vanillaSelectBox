  /* 
 Copyright (C) Philippe Meyer 2019
 Distributed under the MIT License
 vanillaSelectBox v0.20 : working selectBox both single and multiple choices, with search-box
 https://github.com/PhilippeMarcMeyer/vanillaSelectBox
*/
  function vanillaSelectBox(domSelector,options){
	let self = this;
	this.domSelector = domSelector;
    this.root = document.querySelector(domSelector)
	this.main;
	this.button;
	this.title;
	this.isMultiple = this.root.hasAttribute("multiple");
	this.multipleSize = this.isMultiple && this.root.hasAttribute("size") ? parseInt(this.root.getAttribute("size")):-1;
	this.drop;
	this.top;
	this.left;
	this.options;
	this.listElements;
	this.isDisabled = false;
	this.search = false;
	this.searchZone = null;
	this.inputBox = null;
	this.ulminWidth = 140;
	this.ulminHeight = 25;
	
	this.userOptions = {
		maxWidth : 500,
		maxHeight : 400,
		translations : { "all": "All", "items": "items" },
		search : false,
		placeHolder : ""
	}

	if(options){
		if (options.maxWidth != undefined) {
			this.userOptions.maxWidth = options.maxWidth;
		}
		if (options.maxHeight != undefined) {
			this.userOptions.maxHeight = options.maxHeight;
		}
		if (options.translations != undefined) {
			this.userOptions.translations = options.translations;
		}
		if (options.placeHolder != undefined) {
			this.userOptions.placeHolder = options.placeHolder;
		}
		
		if (options.search != undefined) {
            this.search = options.search;
        }
	}
	
   this.init = function(){
	 this.root.style.display = "none"; 
	 let already = document.getElementById("btn-group-"+self.domSelector);
	 if(already){
		 already.remove();
	 }
	 this.main = document.createElement("div");
	 this.root.parentNode.insertBefore(this.main,this.root.nextSibling);
	 this.main.classList.add("vsb-main");
	 this.main.setAttribute("id", "btn-group-"+this.domSelector);
	 this.main.style.marginLeft = this.main.style.marginLeft;
	 
	 this.button = document.createElement("button");
	 let presentValue = this.main.value;
	 this.main.append(this.button);
	 this.title = document.createElement("span");
	 this.button.append(this.title);
	 this.title.classList.add("title");
	 
	 let caret = document.createElement("span");
	 this.button.append(caret);
	 caret.classList.add("caret");
	 caret.style.position = "absolute";
	 caret.style.right = "8px";
	 caret.style.marginTop = "8px";
	 
	 let rect = this.button.getBoundingClientRect();
	 	this.top=rect.bottom;
	this.left=rect.left;;
	 
	 this.drop = document.createElement("div");
	 this.main.append(this.drop);
	 this.drop.classList.add("vsb-menu");
	 
	 let ul = document.createElement("ul");
	 this.drop.append(ul);
	 ul.style.maxHeight = this.userOptions.maxHeight + "px";
	 ul.style.minWidth = this.ulminWidth + "px";
	 ul.style.minHeight = this.ulminHeight + "px";

	if (this.isMultiple) {
		ul.classList.add("multi");
	}
	let selectedTexts = ""
    let sep = "";
	let nrActives = 0;
	
	if (this.search) {
		this.searchZone = document.createElement("div");
			ul.append(this.searchZone);

		this.searchZone.classList.add("vsb-js-search-zone");


		this.inputBox = document.createElement("input");
		
		this.searchZone.append(this.inputBox);
		this.inputBox.setAttribute("type", "text");
		this.inputBox.setAttribute("id", "search_" + this.domSelector);


		let fontSizeForP = this.isMultiple ? "8px" : "6px";
		var para =document.createElement("p");
		ul.append(para);
		para.style.fontSize = fontSizeForP;
		para.innerHTML = "&nbsp;";

		ul.addEventListener("scroll", function (e) {
			var y = this.scrollTop;
			self.searchZone.parentNode.style.top = y + "px";
		});
	}

	this.options = document.querySelectorAll(this.domSelector + " option");
	this.options.forEach(function(x){
		let text = x.textContent;
		let value = x.value;
		let className = x.getAttribute("class");
		let li = document.createElement("li");
		let isSelected = x.hasAttribute("selected");
		ul.append(li);
		li.setAttribute("data-value",value);
		li.setAttribute("data-text",text);
		if(className){
			li.classList.add(className);
		}
		if(isSelected){
			nrActives++;
			selectedTexts += sep + text;
			sep = ",";
			li.classList.add("active");
			if(!self.isMultiple){
				self.title.textContent = text;
				if(className){
					self.title.classList.add(className);
				}
			}
		}
		li.appendChild(document.createTextNode(text));
	});
	
	if (self.multipleSize != -1) {
		if (nrActives > self.multipleSize) {
			let wordForItems = self.userOptions.translations.items || "items"
			selectedTexts = nrActives + " " + wordForItems;
		}
	}
	if(self.isMultiple){
		self.title.innerHTML = selectedTexts;
	}
	
	if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
		self.title.textContent = self.userOptions.placeHolder;
	}
	this.listElements = this.drop.querySelectorAll("li");
	
	if (self.search) {
		
	self.inputBox.addEventListener("keyup", function (e) {
			
		let searchValue = e.target.value.toUpperCase();
		let searchValueLength = searchValue.length;
		if (searchValueLength < 2) {
			self.listElements.forEach(function (x) {
				x.classList.remove("hide");
			});
		} else {
			self.listElements.forEach(function (x) {
				let text = x.getAttribute("data-text").toUpperCase();
				if (text.indexOf(searchValue) == -1) {
					x.classList.add("hide");
				} else {
					x.classList.remove("hide");				
				}
			});
		}
	});
}

	
	
	
	this.main.addEventListener("click",function(e){
		if(self.isDisabled) return;
		self.drop.style.left = self.left +"px";
		self.drop.style.top = self.top +"px";
		self.drop.style.display="block";
		document.addEventListener("click",docListener);
		e.preventDefault();
		e.stopPropagation();
	});
	
	this.drop.addEventListener("click",function(e){
		if(!e.target.hasAttribute("data-value")) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		let choiceValue = e.target.getAttribute("data-value");
		let choiceText = e.target.getAttribute("data-text");
		let className = e.target.getAttribute("class");
		
		if(!self.isMultiple){
			self.root.value = choiceValue;
			self.title.textContent = choiceText;
			if(className){
				self.title.setAttribute("class",className + " title");
			}else{
				self.title.setAttribute("class","title");
			}
			self.listElements.forEach(function(x){
				x.classList.remove("active");
			});
			if(choiceText != ""){
				e.target.classList.add("active");
			}
			self.privateSendChange();
			docListener();
		}else{
			let wasActive = false;
			if(className){
				wasActive = className.indexOf("active") != -1;
			}
			if(wasActive){
				e.target.classList.remove("active");
			}else{
				e.target.classList.add("active");
			}
			
			let selectedTexts = ""
			let sep = "";
			let nrActives = 0;
			let nrAll = 0;	
			
			  for (let i=0; i < self.options.length; i++) {
				  nrAll++;
				  if(self.options[i].value == choiceValue){
					  self.options[i].selected = !wasActive;
				  }
				  if(self.options[i].selected ){
					nrActives++;
					selectedTexts += sep + self.options[i].textContent;
					sep = ","; 
				  }
			  }
			  
			   if (nrAll == nrActives) {
					let wordForAll = self.userOptions.translations.all || "all";
					selectedTexts = wordForAll;
				} else if (self.multipleSize != -1) {
					if (nrActives > self.multipleSize) {
						let wordForItems = self.userOptions.translations.items || "items"
						selectedTexts = nrActives + " " + wordForItems;
					}
				}
				self.title.textContent = selectedTexts;
				self.privateSendChange();
			}
		e.preventDefault();
		e.stopPropagation();
		if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
			self.title.textContent = self.userOptions.placeHolder;
		}
	});
	function docListener(){
		document.removeEventListener("click",docListener);
		self.drop.style.display="none";
	}
  }
 
  
  this.privateSendChange = function(){
	 let event = document.createEvent('HTMLEvents');
	event.initEvent('change', true, false);
	self.root.dispatchEvent(event);
  }
  
  this.empty = function(){
	  self.listElements.forEach(function(x){
		  x.classList.remove("active");
	  });
	  
	  self.options.forEach(function(x){
		  x.selected = false;
	  });	
	  self.title.textContent = "";
	  
	if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
		self.title.textContent = self.userOptions.placeHolder;
	}
	
	  self.privateSendChange();
	  
  }
  
  this.setValue = function(values){
	  if(values == null || values == undefined || values == ""){
		  self.empty();
	  }else{
		 if(self.isMultiple){
			if(type(values) == "string"){
				if(values == "all"){
					values = [];
					self.options.forEach(function(x){
						values.push(x.value);
					});				
				}else{
					values = values.split(",");
				}
			}
			
			let foundValues = [];
			if(type(values) == "array"){
				self.options.forEach(function(x){
				  if(values.indexOf(x.value)!=-1){
					x.selected = true;
					foundValues.push(x.value);
				  }else{
					x.selected = false;
				  }
			  });
			let selectedTexts = ""
			let sep = "";
			let nrActives = 0;
			let nrAll = 0;	
			  self.listElements.forEach(function(x){
				  nrAll++;
				  if(foundValues.indexOf(x.getAttribute("data-value"))!=-1){
					x.classList.add("active");
					nrActives++;
					selectedTexts += sep + x.getAttribute("data-text");
					sep = ","; 
				  }else{
					x.classList.remove("active");
				  }
			  });
			  	if (nrAll == nrActives) {
					let wordForAll = self.userOptions.translations.all || "all";
					selectedTexts = wordForAll;
				} else if (self.multipleSize != -1) {
					if (nrActives > self.multipleSize) {
						let wordForItems = self.userOptions.translations.items || "items"
						selectedTexts = nrActives + " " + wordForItems;
					}
				}
				self.title.textContent = selectedTexts;
				self.privateSendChange();
			}
		 }else{
			 let found = false;
			 let text = "";
			 let classNames = ""
			  self.listElements.forEach(function(x){
				  if(x.getAttribute("data-value")== values){
					x.classList.add("active");
					found = true;
					text = x.getAttribute("data-text")
				  }else{
					x.classList.remove("active");
				  }
			  });
			  
			  self.options.forEach(function(x){
				  if(x.value == values){
					x.selected = true;
					className = x.getAttribute("class");
					if(!className) className = "";
				  }else{
					x.selected = false;
				  }
			  });	
			  if(found){
				 self.title.textContent = text; 
				if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
					self.title.textContent = self.userOptions.placeHolder;
				}
				if(className != ""){
					self.title.setAttribute("class",className + " title");
				}else{
					self.title.setAttribute("class","title");
				}
			  }
			  
		 }	  
	  }
		function type(target) {
			const computedType = Object.prototype.toString.call(target);
			const stripped = computedType.replace("[object ", "").replace("]", "");
			const lowercased = stripped.toLowerCase();
			return lowercased;
		}
  }
  
  this.destroy= function(){
	 let already = document.getElementById("btn-group-"+self.domSelector);
	 if(already){
		 already.remove();
		 self.root.style.display = "inline-block"; 

	 } 
  }
  
  this.disable = function(){
	 let already = document.getElementById("btn-group-"+self.domSelector);
	 if(already){
		 button = already.querySelector("button")
		 button.classList.add("disabled");
		 self.isDisabled = true;
	 } 
  }
  
   this.enable = function(){
	 let already = document.getElementById("btn-group-"+self.domSelector);
	 if(already){
		 button = already.querySelector("button")
		 button.classList.remove("disabled");
		 self.isDisabled = false;
	 } 
  }
  
  this.init();
  }
  
