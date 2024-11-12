(()=>{"use strict";var e={953:(e,t)=>{const s=t.U2=e=>{let t={nodeType:(e=e||void 0).nodeType};e.tagName?t.tagName=e.tagName.toLowerCase():e.nodeName&&(t.nodeName=e.nodeName),e.nodeValue&&(t.nodeValue=e.nodeValue);let i,a,n=e.attributes,o=e.childNodes;if(n){i=n.length,a=t.attributes=new Array(i);for(let e=0;e<i;e++){const t=n[e];a[e]=[t.nodeName,t.nodeValue]}}if(o){i=o.length,a=t.childNodes=new Array(i);for(let e=0;e<i;e++)a[e]=s(o[e])}return t},i=t.QH=e=>{"string"==typeof e&&(e=JSON.parse(e));let t,s=e.nodeType;switch(s){case 1:t=document.createElement(e.tagName);let s=e.attributes||[];for(let e=0,i=s.length;e<i;e++){const i=s[e];t.setAttribute(i[0],i[1])}break;case 3:t=document.createTextNode(e.nodeValue);break;case 8:t=document.createComment(e.nodeValue);break;case 9:t=document.implementation.createDocument();break;case 10:t=document.implementation.createDocumentType(e.nodeName);break;case 11:t=document.createDocumentFragment();break;default:return t}if(1==s||11==s){const s=e.childNodes||[];for(let e=0,a=s.length;e<a;e++)t.appendChild(i(s[e]))}return t}}},t={};class s{#e=document.querySelector(".sidebar-wrapper");#t=document.querySelector(".sidebar-btn");#s=document.querySelector(".projects-list");#i=Array.from(document.querySelectorAll(".option"));#a=null;#n;constructor(e){this.#n=e}get#o(){return window.innerWidth<1100}get#r(){return this.#e.classList.contains("sidebar-closed")}get overlay(){return document.querySelector(".sidebar-overlay")}#d(e=!1){this.#e.classList.toggle("sidebar-closed"),e&&this.#r?this.#e.classList.add("toggled-off"):this.#e.classList.remove("toggled-off")}#c(){this.#r?this.#t.classList.add("standAlone"):this.#t.classList.remove("standAlone")}#l(){this.overlay.classList.contains("show")?this.#e.addEventListener("transitionend",(()=>{this.overlay&&this.overlay.classList.remove("show")}),{once:!0}):this.overlay.classList.add("show")}#p(){this.overlay?this.toggleSidebarWithOverlay():this.toggleSidebarWithoutOverlay()}#m(){const e=document.createElement("div");e.classList.add("sidebar-overlay"),e.appendChild(this.#e),this.#n.insertBefore(e,this.#n.firstChild),this.#u(e)}#h(){this.#n.removeChild(this.overlay),this.#n.insertBefore(this.#e,this.#n.firstChild)}#u(e){e.addEventListener("click",(e=>{this.#r||e.target.closest(".sidebar")&&!e.target.closest(".sidebar button")||this.toggleSidebarWithOverlay()}),!0)}#y(){const e=this.#e.classList.contains("toggled-off");this.#o&&!this.#r?(this.overlay&&this.#l(),this.#e.classList.add("sidebar-closed"),this.#c()):this.#o||e||!this.#r||setTimeout((()=>{this.#e.classList.remove("sidebar-closed"),this.#c()}),1)}#k(){!this.#o&&this.overlay&&this.#h(),this.#y(),clearTimeout(this.#a),this.#a=setTimeout((()=>{this.#o&&this.#r&&!this.overlay&&this.#m()}),200)}toggleSidebarWithoutOverlay(){this.#d(!0),this.#c()}toggleSidebarWithOverlay(){this.#l(),this.#d(),this.#c()}setUpListeners(){this.#t.addEventListener("click",(e=>{e.stopPropagation(),this.#p()})),window.addEventListener("resize",(()=>{this.#k()}));for(const e of this.#i)this.setUpOptionBtn(e)}setUpOptionBtn(e){e.addEventListener("click",(()=>{if(!e.classList.contains("clicked")){const t=this.#i.find((e=>e.classList.contains("clicked")));t&&t.classList.remove("clicked"),e.classList.add("clicked")}}))}initialize(){this.#k(),this.setUpListeners()}addProject(e){this.#s.appendChild(e),this.#i.push(e),this.setUpOptionBtn(e)}removeProject(e){this.#s.removeChild(e);const t=this.#i.indexOf(e);this.#i.splice(t,1)}updateProject(e,t){this.#s.insertBefore(t.display,e.display),this.#s.removeChild(e.display),this.setUpOptionBtn(t.display);const s=this.#i.indexOf(e.display);this.#i.splice(s,1,t.display)}}class i{constructor(e,t,s,i){const a=document.createElement("div");a.classList.add("confirm-overlay");const n=document.createElement("div");n.classList.add("confirm-modal","modal");const o=document.createElement("h1");o.textContent=e;const r=document.createElement("p");r.textContent=t;const d=document.createElement("div");d.classList.add("confirm-buttons");const c=document.createElement("button");c.type="button",c.classList.add("cancel"),c.textContent="Cancel",c.addEventListener("click",(()=>i(a)));const l=document.createElement("button");l.type="button",l.classList.add("confirm"),l.textContent=s,l.addEventListener("click",(()=>i(a))),d.appendChild(c),d.appendChild(l),n.appendChild(o),n.appendChild(r),n.appendChild(d),a.appendChild(n),this.confirm=l,this.confirmOverlay=a}}class a{constructor(e,t,s){const i=document.createElement("div");i.classList.add("modal-overlay");const a=document.createElement("form");a.classList.add("create-task","modal"),a.autocomplete="off";const n=document.createElement("input");n.type="text",n.name="task-name",n.id="task-name",n.placeholder="Task Name";const o=document.createElement("input");o.type="text",o.name="description",o.id="description",o.placeholder="Description";const r=e();r.id="date-time";const d=document.createElement("select");d.name="project",d.id="select-project";const c=document.createElement("option");c.value="default",c.textContent="Project",c.selected=!0,d.appendChild(c);const l=document.createElement("div");l.classList.add("buttons");const p=document.createElement("button");p.type="button",p.id="cancel",p.classList.add("cancel"),p.textContent="Cancel";const m=document.createElement("button");m.type="submit",m.id="submit",m.textContent="Submit",m.disabled=!0,l.appendChild(p),l.appendChild(m),a.appendChild(n),a.appendChild(o),a.appendChild(r),a.appendChild(d),a.appendChild(l),i.appendChild(a),this.overlay=i,this.modal=a,this.project=d,this.submit=m,this.cancel=p,this.requireInput=t,this.fillProjects=s}}class n{constructor(e){const t=document.createElement("div");t.classList.add("modal-overlay");const s=document.createElement("div");s.classList.add("new-project","modal");const i=document.createElement("input");i.classList.add("project-name"),i.type="text",i.placeholder="Project Name";const a=document.createElement("div");a.classList.add("buttons");const n=document.createElement("button");n.type="button",n.textContent="Cancel",n.classList.add("cancel");const o=document.createElement("button");o.type="button",o.textContent="Submit",o.classList.add("submit"),o.disabled=!0,a.appendChild(n),a.appendChild(o),s.appendChild(i),s.appendChild(a),t.appendChild(s),this.overlay=t,this.modal=s,this.cancel=n,this.submit=o,this.requireInput=e}}class o{#v;#f;#g;constructor(e,t,s){this.#f=e,this.buildDatePicker=t,this.fillProjects=s}#C(e){const t=e.cancel,s=s=>{(e.modal.contains(s.target)||s.target.classList.contains("sidebar-btn"))&&s.target!==t||this.closeModal(e)};this.#v=s,window.addEventListener("mousedown",s)}requireInput(){const e=this.modal.firstChild;e.focus(),e.addEventListener("input",(()=>{e.value.match(/\S+/)?this.submit.disabled=!1:this.submit.disabled=!0}))}closeExistingModal(){this.#g&&this.closeModal(this.#g)}newTaskModal(e,t){const s=new a(this.buildDatePicker,this.requireInput,this.fillProjects);let i;return i=t?t.textContent:null,s.fillProjects(e,i),this.initializeModal(s),s}newProjectModal(e){const t=new n(this.requireInput);return e&&(t.modal.firstChild.value=e,t.submit.disabled=!1),this.initializeModal(t),t}initializeModal(e){this.#C(e),this.#f.appendChild(e.overlay),e.requireInput(),this.#g=e}closeModal(e){e.modal.classList.add("close-modal"),e.modal.addEventListener("animationend",(()=>{this.#f.removeChild(e.overlay)})),window.removeEventListener("mousedown",this.#v),this.#g=null}createCancelModal(){const e=new i("Discard Changes?","No changes will be saved.","Discard",this.closeConfirmModal);return e.confirmOverlay.classList.add("cancel-modal"),this.#f.appendChild(e.confirmOverlay),e}createDeleteModal(e){const t=new i(`Are you sure you want to delete #${e}?`,"All tasks within this project will be deleted.","Delete",this.closeConfirmModal);return t.confirmOverlay.classList.add("delete-modal"),this.#f.appendChild(t.confirmOverlay),t}createConfirmEditProject(e,t){const s=new i(`Are you sure you would like to change #${e} to #${t}?`,"All tasks within this project will be changed.","Confirm",this.closeConfirmModal);return this.#f.appendChild(s.confirmOverlay),s}closeConfirmModal=e=>{this.#f.removeChild(e)}}class r{#f;#v;constructor(e,t){this.#f=e,this.buildDatePicker=t}createTaskDisplay(e){const t=document.createElement("div");t.classList.add("task");const s=document.createElement("div");s.classList.add("checkbox");const i=document.createElement("div");i.classList.add("completed-indicator"),s.appendChild(i);const a=document.createElement("div");if(a.classList.add("task-info"),e.taskName){const t=document.createElement("p");t.classList.add("task-name"),t.textContent=e.taskName,a.appendChild(t)}if(e.description){const t=document.createElement("p");t.classList.add("description","task-detail"),t.textContent=e.description,a.appendChild(t)}if(e.dateTime){const t=document.createElement("p");t.classList.add("date-and-time","task-detail"),t.textContent=new Date(e.dateTime).toLocaleString("en-US",{day:"numeric",year:"numeric",month:"numeric",hour:"2-digit",minute:"2-digit"}),a.appendChild(t)}if("default"!==e.project){const t=document.createElement("p");t.classList.add("task-project","task-detail"),t.textContent=`#${e.project}`,a.appendChild(t)}const n=document.createElement("div");n.classList.add("actions");const o={},r=document.createElement("div");r.classList.add("edit");const d=document.createElement("div");return d.classList.add("delete"),o.checkbox=s,o.edit=r,o.delete=d,n.appendChild(o.edit),n.appendChild(o.delete),t.appendChild(s),t.appendChild(a),t.appendChild(n),{taskDisplay:t,actionButtons:o}}insertTaskDisplay(e,t){t.parentNode.insertBefore(e,t)}removeTaskDisplay(e){e.remove()}addEditPane(e,t){const s=document.createElement("form");s.classList.add("edit-pane","modal"),s.autocomplete="off";const i=document.createElement("input");i.type="text",i.name="task-name",i.classList.add("edit-name"),i.placeholder="Task Name",i.value=e.taskName;const a=document.createElement("input");a.type="text",a.name="description",a.classList.add("edit-description"),a.placeholder="Description",a.value=e.description;const n=this.buildDatePicker();n.classList.add("edit-date"),n.value=e.dateTime;const o=document.createElement("select");o.classList.add("edit-project"),o.name="project";const r=document.createElement("option");r.value="default",r.textContent="Project",r.selected=!0;const d=document.createElement("div");d.classList.add("edit-buttons");const c=document.createElement("button");c.type="button",c.id="cancel-edit",c.classList.add("cancel"),c.textContent="Cancel";const l=document.createElement("button");return l.type="submit",l.id="submit-edit",l.classList.add("submit"),l.textContent="Submit",d.appendChild(c),d.appendChild(l),o.appendChild(r),s.appendChild(i),s.appendChild(a),s.appendChild(n),s.appendChild(o),s.appendChild(d),e.display.parentNode.insertBefore(s,e.display),this.closeEditIfOutsideClick(s,e.display),{modal:s,project:o,cancel:c,submit:l,fillProjects:t}}removeEditPane(e){e.remove()}closeEditIfOutsideClick(e,t){const s=s=>{e.contains(s.target)||s.target.closest(".confirm-overlay")||this.closeEdit(t,e)};window.addEventListener("mousedown",s),this.#v=s}closeEdit(e,t){this.insertTaskDisplay(e,t),this.removeEditPane(t),window.removeEventListener("mousedown",this.#v)}}class d{constructor(e,t,s){const i=document.createElement("div");i.classList.add("task-group");const a=document.createElement("div");a.classList.add("task-group-header");const n=document.createElement("h3");n.textContent=e;const o=document.createElement("div");o.classList.add("dropdown");const r=document.createElement("div");r.classList.add("group-container"),o.addEventListener("click",(()=>{o.classList.toggle("clicked"),r.classList.toggle("hide")}));for(const e of t)r.appendChild(e.display);a.appendChild(n),a.appendChild(o),i.appendChild(a),i.appendChild(r),this.container=i,this.removeIfEmpty(this.container,r,s)}removeIfEmpty(e,t,s){const i=t;new MutationObserver(((i,a)=>{document.body.contains(e)?t.children.length||(s.click(),a.disconnect()):a.disconnect()})).observe(i,{childList:!0})}}class c{constructor(e){this.taskName=e.taskName,this.description=e.description,this.dateTime=e.dateTime,this.project=e.project}}var l=function s(i){var a=t[i];if(void 0!==a)return a.exports;var n=t[i]={exports:{}};return e[i](n,n.exports,s),n.exports}(953);class p{constructor(e){this.projectName=e,this.display=document.createElement("button"),this.display.type="button",this.display.classList.add("option"),this.display.textContent=e;const t=document.createElement("div");t.classList.add("project-actions","actions"),this.editBtn=document.createElement("div"),this.editBtn.classList.add("edit"),this.deleteBtn=document.createElement("div"),this.deleteBtn.classList.add("delete"),t.appendChild(this.editBtn),t.appendChild(this.deleteBtn),this.display.appendChild(t)}}const m=new class{#b=document.querySelector(".items-wrapper");#f=document.querySelector(".items");#n=document.querySelector("#content");#E;constructor(){this.sidebarController=new s(this.#n),this.modalController=new o(this.#f,this.buildDatePicker,this.fillProjects),this.taskDisplayController=new r(this.#f,this.buildDatePicker)}initialize(){this.sidebarController.initialize()}getCurrentDateTime(){const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}T${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}onInvalidDate=e=>{const t=e.currentTarget,s=new Date(t.value),i=new Date;t.value?s<i&&t.setCustomValidity(`Please enter date and time after ${i.toLocaleString("en-US",{month:"numeric",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}.`):t.setCustomValidity("Please enter date and time.")};onValidDate(e){e.currentTarget.setCustomValidity("")}buildDatePicker=()=>{const e=document.createElement("input");return e.type="datetime-local",e.name="date-and-time",e.min=this.getCurrentDateTime(),e.max="9999-12-31T23:59",e.oninvalid=this.onInvalidDate,e.oninput=this.onValidDate,e};createSearchInput(){const e=document.createElement("div");e.classList.add("search-container");const t=document.createElement("input");t.classList.add("search-input"),t.placeholder="Search by task name ....";const s=document.createElement("input");return s.type="date",s.max="9999-12-31",e.append(t,s),this.#b.prepend(e),{searchInput:t,datePicker:s}}fillProjects(e,t){const s=this;e.forEach((e=>{const i=document.createElement("option");i.textContent=e.projectName,i.value=e.projectName,t&&t===e.projectName&&(i.selected=!0),s.project.appendChild(i)}))}newTaskModal(e){return this.modalController.closeExistingModal(),this.modalController.newTaskModal(e,this.#E)}newProjectModal(e=null){return this.modalController.closeExistingModal(),this.modalController.newProjectModal(e)}closeModal(e){this.modalController.closeModal(e)}addProject(e){this.sidebarController.addProject(e)}removeProject(e){this.sidebarController.removeProject(e)}createNewTaskDisplay(e){const{taskDisplay:t,actionButtons:s}=this.taskDisplayController.createTaskDisplay(e);return{taskDisplay:t,actionButtons:s}}removeTaskDisplay(e){this.taskDisplayController.removeTaskDisplay(e)}editTask(e,t){const s=this.taskDisplayController.addEditPane(e,this.fillProjects);return s.fillProjects(t,e.project),this.taskDisplayController.removeTaskDisplay(e.display),s}taskIsDisplayed(e){return!!this.#f.contains(e)}currentOpenFilter(){return this.#E}closeEdit(e,t){this.taskDisplayController.closeEdit(e,t)}confirmCancel(){return this.modalController.createCancelModal()}confirmDelete(e){return this.modalController.createDeleteModal(e)}confirmEditProject(e,t){return this.modalController.createConfirmEditProject(e,t)}updateProject(e,t){this.sidebarController.updateProject(e,t)}updateTaskOfProject(e,t){const{taskDisplay:s,actionButtons:i}=this.taskDisplayController.createTaskDisplay(e);return this.taskDisplayController.insertTaskDisplay(s,t),this.taskDisplayController.removeTaskDisplay(t),{taskDisplay:s,actionButtons:i}}clearTasks(){this.#f.innerHTML=""}displayTasks(e){this.clearTasks();for(const t of e)this.#f.appendChild(t.display)}setFilter(e=null,t=null){this.clearTasks();const s=this.#b.children[0];if((s.classList.contains("project-header")||s.classList.contains("search-container"))&&s.remove(),e){const s=document.createElement("h1");s.classList.add("project-header"),s.textContent=`${e}`,this.#b.prepend(s),this.#E=t}else this.#E=null}formatOverdue(e,t,s){if(e.length){const t=new d("Overdue",e,this.#E);this.#f.prepend(t.container)}if(t.length){const e=new d(s,t,this.#E);this.#f.appendChild(e.container)}}},u=new class{#L=[];#s=[];createTask(e){return new c(e)}storeTask(e){const t=this.#L.findIndex((t=>!t.dateTime||new Date(t.dateTime)>new Date(e.dateTime)));this.#L.length&&e.dateTime&&-1!==t?this.#L.splice(t,0,e):this.#L.push(e)}updateTask(e,t){const s=this.#L.indexOf(e);this.#L.splice(s,1);const i=this.createTask(t);return this.storeTask(i),i}removeTask(e){const t=this.#L.indexOf(e);this.#L.splice(t,1)}addProject(e){this.#s.push(e)}removeProject(e){const t=this.#s.indexOf(e);this.#s.splice(t,1)}getTasksByProject(e){return this.#L.filter((t=>t.project===e))}getOverdue(e){return this.#L.filter((t=>new Date(t.dateTime)<e))}compareDatesWithoutTime(e,t){return`${e.getMonth()}-${e.getDate()}-${e.getFullYear()}`==`${t.getMonth()}-${t.getDate()}-${t.getFullYear()}`}getTasksByDate(e){return this.#L.filter((t=>{const s=new Date(t.dateTime);return this.compareDatesWithoutTime(s,e)}))}getTasksByName(e){return this.#L.filter((t=>t.taskName.toUpperCase().includes(e.toUpperCase())))}getFutureTasks(e){return this.#L.filter((t=>new Date(t.dateTime)>e))}getTasksByQuery(e,t){return e&&!t?this.getTasksByName(e):t&&!e?this.getTasksByDate(t):e&&t?this.#L.filter((s=>s.taskName.toUpperCase().includes(e.toUpperCase())&&this.compareDatesWithoutTime(new Date(s.dateTime),t))):[]}updateProject(e,t){const s=this.getTasksByProject(e.projectName);for(const e of s)e.project=t.projectName;const i=this.#s.indexOf(e);return this.#s.splice(i,1,t),s}storeTasks(){let e=[];this.#L.forEach((t=>{e.push(t.taskName),t.JSONdisplay=(0,l.U2)(t.display),localStorage.setItem(`${t.taskName}`,JSON.stringify(t))})),localStorage.setItem("taskNames",JSON.stringify(e))}storeProjects(){let e=[];this.#s.forEach((t=>{t.display.classList.remove("clicked"),t.JSONdisplay=(0,l.U2)(t.display),e.push(t.projectName),localStorage.setItem(`#${t.projectName}`,JSON.stringify(t))})),localStorage.setItem("projectNames",JSON.stringify(e))}refreshStorage(){localStorage.clear(),this.storeTasks(),this.storeProjects()}retrieveTasks(){if(localStorage.getItem("taskNames")){const e=JSON.parse(localStorage.getItem("taskNames"));if(e.length)for(const t of e){const e=JSON.parse(localStorage.getItem(`${t}`));e.display=(0,l.QH)(e.JSONdisplay),this.#L.push(e)}}}retrieveProjects(){if(localStorage.getItem("projectNames")){const e=JSON.parse(localStorage.getItem("projectNames"));if(e.length)for(const t of e){const e=JSON.parse(localStorage.getItem(`#${t}`));e.display=(0,l.QH)(e.JSONdisplay),this.#s.push(e)}}}setUpStorage(){this.retrieveTasks(),this.retrieveProjects()}get projects(){return this.#s}get tasks(){return this.#L}};function h(){const e=m.currentOpenFilter();e?e.click():g()}function y(e,t,s,i){const a=u.getOverdue(e),n=s.textContent;return m.setFilter(n,s),m.displayTasks(a.concat(t)),a.length&&m.formatOverdue(a,t,n),i&&clearInterval(i),i=function(e,t){const s=setInterval((()=>{if(m.currentOpenFilter()===t&&e.length){for(const i of e)if(new Date(i.dateTime)<new Date)return t.click(),void clearInterval(s)}else clearInterval(s)}),1e3);return s}(t,s),i}function k(e){const t=new p(e);m.addProject(t.display),u.addProject(t),u.refreshStorage(),f(t)}function v(e){const t=e.classList[0];return{taskName:e.querySelector(`.${t} [name="task-name"]`).value,description:e.querySelector(`.${t} [name="description"]`).value,dateTime:e.querySelector(`.${t} [name="date-and-time"]`).value,project:e.querySelector(`.${t} [name="project"]`).value}}function f(e){e.deleteBtn.addEventListener("click",(t=>{t.stopPropagation(),function(e){m.confirmDelete(e.projectName).confirm.addEventListener("click",(()=>{!function(e){const t=u.getTasksByProject(e.projectName);for(const e of t)u.removeTask(e),m.taskIsDisplayed(e.display)&&m.removeTaskDisplay(e.display);m.currentOpenFilter()===e.display&&g(),m.removeProject(e.display),u.removeProject(e),u.refreshStorage()}(e)}))}(e)})),e.editBtn.addEventListener("click",(t=>{t.stopPropagation(),function(e){const t=m.newProjectModal(e.projectName),s=t.modal.firstChild,i=()=>{const i=s.value;i!==e.projectName?function(e,t){m.confirmEditProject(e.projectName,t).confirm.addEventListener("click",(()=>{!function(e,t){const s=new p(t),i=u.updateProject(e,s);m.updateProject(e,s),f(s),function(e){for(const t of e){const e=t.display,{taskDisplay:s,actionButtons:i}=m.updateTaskOfProject(t,e);t.display=s,C(i,t)}}(i),u.refreshStorage(),s.display.click()}(e,t)}))}(e,i):m.closeModal(t)};t.submit.addEventListener("click",(()=>{i()})),s.addEventListener("keydown",(e=>{"Enter"===e.key&&s.value.match(/\S+/)&&(s.blur(),i())}))}(e)})),e.display.addEventListener("click",(()=>{!function(e){const t=u.getTasksByProject(e.projectName),s=e.display;m.setFilter(e.projectName,s),m.displayTasks(t)}(e)}))}function g(){document.querySelector(".all").click()}function C(e,t){e.checkbox.addEventListener("click",(()=>{!function(e,t){const s=e.children[0];s.classList.add("completed"),s.addEventListener("animationend",(()=>{b(t)}))}(e.checkbox,t)})),e.delete.addEventListener("click",(()=>{b(t)})),e.edit.addEventListener("click",(()=>{!function(e,t){e.cancel.addEventListener("click",(()=>{!function(e,t){E(v(e.modal),t)?m.confirmCancel().confirm.addEventListener("click",(()=>{m.closeEdit(t.display,e.modal)})):m.closeEdit(t.display,e.modal)}(e,t)})),e.modal.addEventListener("submit",(s=>{s.preventDefault(),function(e,t){const s=v(e.modal);if(E(s,t)){t=u.updateTask(t,s);const{taskDisplay:i,actionButtons:a}=m.createNewTaskDisplay(t);m.closeEdit(i,e.modal),t.display=i,u.refreshStorage(),C(a,t)}else m.closeEdit(t.display,e.modal)}(e,t),h()}))}(m.editTask(t,u.projects),t)}))}function b(e){e.display.classList.add("deleted"),e.display.addEventListener("transitionend",(()=>{m.removeTaskDisplay(e.display),u.removeTask(e),u.refreshStorage()}))}function E(e,t){return e.taskName!==t.taskName||e.description!==t.description||e.dateTime!==t.dateTime||e.project!==t.project}!function(){if(m.initialize(),function(){let e,t=null;document.querySelector(".add-task").addEventListener("click",(()=>{e=m.newTaskModal(u.projects),e.modal.scrollIntoView(),e&&e.modal.addEventListener("submit",(t=>{t.preventDefault(),m.closeModal(e),function(e){const t=v(e),s=u.createTask(t),{taskDisplay:i,actionButtons:a}=m.createNewTaskDisplay(s);s.display=i,u.storeTask(s),u.refreshStorage(),C(a,s)}(e.modal),h()}))})),document.querySelector(".search").addEventListener("click",(()=>{m.setFilter();const{searchInput:e,datePicker:t}=m.createSearchInput(),s=(e,t)=>{const s=""===e?null:e.trimStart();let i;if(""!==t){const e=t.split("-"),s=Number(e[0]),a=Number(e[1])-1,n=Number(e[2]);i=new Date(s,a,n)}else i=null;const a=u.getTasksByQuery(s,i);m.displayTasks(a)};e.addEventListener("input",(()=>s(e.value,t.value))),t.addEventListener("input",(()=>s(e.value,t.value)))}));const s=document.querySelector(".today");s.addEventListener("click",(()=>{const e=new Date,i=u.getTasksByDate(e).filter((t=>new Date(t.dateTime)>e));t=y(e,i,s,t)}));const i=document.querySelector(".upcoming");i.addEventListener("click",(()=>{const e=new Date,s=u.getFutureTasks(e);t=y(e,s,i,t)})),document.querySelector(".all").addEventListener("click",(()=>{m.setFilter(),m.displayTasks(u.tasks)})),document.querySelector(".add-project").addEventListener("click",(()=>{!function(){const e=m.newProjectModal(),t=e.modal.firstChild;e.modal.scrollIntoView(),e.submit.addEventListener("click",(()=>{m.closeModal(e),k(t.value)})),t.addEventListener("keydown",(s=>{"Enter"===s.key&&t.value.match(/\S+/)&&(m.closeModal(e),k(t.value))}))}()}))}(),u.setUpStorage(),u.tasks.length){for(const e of u.tasks){const t=e.display.querySelector(".actions").children;C({checkbox:e.display.children[0],delete:t[1],edit:t[0]},e)}m.displayTasks(u.tasks)}if(u.projects.length)for(const e of u.projects){const t=e.display.children[0],s=t.children[0],i=t.children[1];e.editBtn=s,e.deleteBtn=i,m.addProject(e.display),f(e)}}()})();
//# sourceMappingURL=app.bundle.js.map