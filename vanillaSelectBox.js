  /* 
 Copyright (C) Philippe Meyer 2019
 Distributed under the MIT License
 vanillaSelectBox v0.01 : shows a dropdown à la bootstrap with no dependency
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
	this.drop;
	this.top;
	this.left;
	this.options;
	this.listElements;
	
	this.userOptions = {
		maxWidth : 500,
		maxHeight : 400
	}

	if(options){
		if (options.maxWidth != undefined) {
			this.userOptions.maxWidth = options.maxWidth;
		}
		if (options.maxHeight != undefined) {
			this.userOptions.maxHeight = options.maxHeight;
		}
	}
	
	
   this.init = function(){
	 this.root.style.display = "none"; 
	 let already = document.querySelector("#btn-group-"+this.domSelector);
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
	if (this.isMultiple) {
		ul.classList.add("multi");
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
		if(className != ""){
			li.classList.add(className);
		}
		if(isSelected){
			li.classList.add("active");
			if(!self.isMultiple){
				self.title.textContent = text;
				if(className != ""){
					self.title.classList.add(className);
				}
			}
		}
		li.appendChild(document.createTextNode(text));
	});
	this.listElements = this.drop.querySelectorAll("li");
	this.main.addEventListener("click",function(e){
		self.drop.style.left = self.left +"px";
		self.drop.style.top = self.top +"px";
		self.drop.style.display="block";
		document.addEventListener("click",docListener);
		e.preventDefault();
		e.stopPropagation();
	});
	this.drop.addEventListener("click",function(e){
		if(!self.isMultiple){
			let choiceValue = e.target.getAttribute("data-value");
			let choiceText = e.target.getAttribute("data-text");
			let className = e.target.getAttribute("class");
			self.root.value = choiceValue;
			self.title.textContent = choiceText;
			if(className != ""){
				self.title.setAttribute("class",className + " title");
			}else{
				self.title.setAttribute("class","title");
			}
			self.listElements.forEach(function(x){
				x.classList.remove("active");
			});
			e.target.classList.add("active");
			docListener();
		}
		e.preventDefault();
		e.stopPropagation();
	});
	function docListener(){
		document.removeEventListener("click",docListener);
		self.drop.style.display="none";
	}
  }
  this.init();
  }
  
