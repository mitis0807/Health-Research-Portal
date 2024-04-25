(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1283:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SearchContentCoordinator=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=a(0),r=p(n),o=a(21),u=p(a(3)),i=a(36),s=p(a(29)),d=p(a(197)),c=p(a(46)),f=p(a(1335));function p(e){return e&&e.__esModule?e:{default:e}}var m=o.Modal.error,y=[{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Title")),dataIndex:"title",key:"title",ellipsis:!0,width:"30%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Start Date")),dataIndex:"startDate",key:"startDate",ellipsis:!0},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"End Date")),dataIndex:"endDate",key:"endDate",ellipsis:!0}],b=t.SearchContentCoordinator=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={data:[]},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"componentWillMount",value:function(){var e=this;fetch(s.default.APIURL+"/getAllProposalResearchForCoordinator",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({})}).then((function(e){return e.json()})).then((function(t){200===t.status?e.setState({data:t.proposalResearchData}):300===t.status?i.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?m({title:c.default.SessionExpired+t.message,content:"",onOk:function(){(void 0).props.history.push("/signIn")}}):500===t.status?e.props.history.push("/serverError"):400===t.status?e.props.history.push("/badRequest"):403===t.status&&e.props.history.push("/forbiddenRequest")}))}},{key:"renderTableData",value:function(){return this.state.data.map((function(e,t){var a=(0,u.default)(e.startDate).format("DD-MM-YYYY"),l=(0,u.default)(e.endDate).format("DD-MM-YYYY");return{key:t,title:e.title,startDate:a,endDate:l,description:r.default.createElement(f.default,{dataItem:e})}}))}},{key:"render",value:function(){return document.title="Search Content | "+c.default.PageTitle,r.default.createElement("div",null,r.default.createElement(d.default,{propertyProps:this.props}),r.default.createElement(o.Card,{title:r.default.createElement("b",null,"Search Content"),className:"cardcss",extra:r.default.createElement(o.Input,{type:"text",placeholder:"Search"})},r.default.createElement(o.Table,{className:"gx-table-responsive",columns:y,expandedRowRender:function(e){return r.default.createElement("p",{style:{margin:0}},e.description)},dataSource:this.renderTableData()})))}}]),t}(n.Component);t.default=b},1335:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DataForDescription=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=a(0),r=u(n),o=u(a(3));function u(e){return e&&e.__esModule?e:{default:e}}var i=t.DataForDescription=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e;e=this.props.dataItem;var t=(0,o.default)(e.startDate).format("DD-MM-YYYY"),a=(0,o.default)(e.endDate).format("DD-MM-YYYY");return r.default.createElement("div",null,r.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"First name : "),e&&e.investigator&&void 0===e.investigator.firstName?r.default.createElement("span",null," N/A"):e.investigator.firstName)),r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Last name : "),void 0===e.investigator.lastName?r.default.createElement("span",null," N/A"):e.investigator.lastName))),r.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Background : "),void 0===e.background?r.default.createElement("span",null," N/A"):e.background)),r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Expected outcome : "),void 0===e.expectedOutcomes?r.default.createElement("span",null," N/A"):e.expectedOutcomes))),r.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Start date : ")," ",void 0===e.startDate?r.default.createElement("span",null," N/A"):t)),r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"End date : ")," ",void 0===e.endDate?r.default.createElement("span",null," N/A"):a))),r.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Keyword : ")," ",void 0===e.keywords?r.default.createElement("span",null," N/A"):e.keywords)),r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Involves human subject : ")," ",void 0===e.humanSubjects?r.default.createElement("span",null," N/A"):!0===e.humanSubjects?"Yes":!1===e.humanSubjects?"No":e.humanSubjects))),r.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},r.default.createElement("div",{style:{width:"50%"}}," ",r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Amount : ")," ",r.default.createElement("label",{value:"FJ"},"FJ$ "),void 0===e.amount?r.default.createElement("span",null," N/A"):e.amount)),r.default.createElement("div",{style:{width:"50%"}},r.default.createElement("span",{style:{wordBreak:"break-all"}},r.default.createElement("b",null,"Level of risk involved : ")," ",void 0===e.levelRisk?r.default.createElement("span",null," N/A"):e.levelRisk))))}}]),t}(n.Component);t.default=i}}]);