(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1280:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManagePolicy=void 0;var a,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),i=n(0),r=(a=i)&&a.__esModule?a:{default:a},l=n(21);var c=[{title:"Policy Name",dataIndex:"policyName",key:"policyName"},{title:"Uploaded By",dataIndex:"uploadedBy",key:"uploadedBy"},{title:"Uploaded On",dataIndex:"uploadedOn",key:"uploadedOn"},{title:"Status",dataIndex:"status",key:"status"},{title:"Action",dataIndex:"action",key:"action",render:function(){return r.default.createElement("span",{className:"gx-link"},"View")}}],u=[{key:1,policyName:"John Brown",status:"active",uploadedBy:"Miti",uploadedOn:"10/09/2019",description:"My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."},{key:2,policyName:"Jim Green",status:"active",uploadedBy:"Divya",uploadedOn:"10/09/2019",description:"My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."},{key:3,policyName:"Joe Black",uploadedBy:"Pratiksha",status:"active",uploadedOn:"10/09/2019",description:"My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."}],d=t.ManagePolicy=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"handleViewClick",value:function(){}},{key:"handleButtonClick",value:function(){this.props.history.push("/managePolicy/addPolicy")}},{key:"render",value:function(){return r.default.createElement("div",null,r.default.createElement(l.Card,{className:"cardcss",title:"Policies",extra:r.default.createElement(l.Button,{onClick:this.handleButtonClick.bind(this),type:"primary"},"Add policy")},r.default.createElement(l.Table,{className:"gx-table-responsive",columns:c,expandedRowRender:function(e){return r.default.createElement("p",{style:{margin:0}},e.description)},dataSource:u})))}}]),t}(i.Component);t.default=d}}]);