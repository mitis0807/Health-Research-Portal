(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1305:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageProposal=void 0;var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(0),r=f(l),o=a(21),i=f(a(3)),s=a(36),u=f(a(29)),c=f(a(197)),d=f(a(1333)),p=f(a(46));function f(e){return e&&e.__esModule?e:{default:e}}a(37);var h=o.Modal.error,m=o.Input.Search,y=void 0,g=[{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Title")),dataIndex:"title",key:"title",ellipsis:!0,width:"30%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Start Date")),dataIndex:"startDate",key:"startDate",ellipsis:!0,width:"17%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"End Date")),dataIndex:"endDate",key:"endDate",ellipsis:!0,width:"16%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"View")),dataIndex:"view",key:"view",width:"15%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Download")),dataIndex:"download",key:"download",width:"17%"},{title:r.default.createElement("div",{style:{fontSize:14}},r.default.createElement("b",null,"Action")),dataIndex:"action",key:"action",width:"8%"}],b=t.ManageProposal=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleSearchChange=function(e){""===e.target.value&&a.getAllResearch()},a.onCustomSearch=function(e){console.log("search value ****",e),a.setState({searchValue:e}),fetch(u.default.APIURL+"/researches/"+e,{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){200===e.status?a.setState({data:e.researchData}):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===e.status?h({title:p.default.SessionExpired+e.message,content:"",onOk:function(){y.props.history.push("/signIn")}}):500===e.status?a.props.history.push("/serverError"):400===e.status?a.props.history.push("/badRequest"):403===e.status&&a.props.history.push("/forbiddenRequest")}))},a.state={data:[],searchValue:"",reportURL:void 0,pageNumber:1,total:void 0},y=a,a.onChangeOfPagination=a.onChangeOfPagination.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),n(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.pageNumber;fetch(u.default.APIURL+"/getAllResearchForCoordinator/"+t,{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include"}).then((function(e){return e.json()})).then((function(t){200===t.status?e.setState({data:t.researchData,total:t.total}):300===t.status?s.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?h({title:p.default.SessionExpired+t.message,content:"",onOk:function(){y.props.history.push("/signIn")}}):500===t.status?e.props.history.push("/serverError"):400===t.status?e.props.history.push("/badRequest"):403===t.status&&e.props.history.push("/forbiddenRequest")}))}},{key:"onChangeOfPagination",value:function(e){var t=this;console.log("in pn change of pagination"),console.log(e),this.setState({pageNumber:e}),fetch(u.default.APIURL+"/getAllResearchForCoordinator/"+e,{credentials:"include"}).then((function(e){return e.json()})).then((function(e){200===e.status?t.setState({data:e.researchData,total:e.total}):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):500===e.status?t.props.history.push("/serverError"):400===e.status?t.props.history.push("/badRequest"):403===e.status&&t.props.history.push("/forbiddenRequest")}))}},{key:"handleClickOfReports",value:function(e,t){var a=this;console.log("in handleClickOfReports first"),console.log(e),console.log(t),console.log(u.default.APIURL+"/reportForCoordinator/"+e+"/"+t),fetch(u.default.APIURL+"/reportForCoordinator/"+e+"/"+t,{}).then((function(e){return e.json()})).then((function(e){console.log("after api calll"),console.log(e),200===e.status&&(console.log("in 200 of handleClickOfReports"),console.log(e),a.setState({reportURL:e.URL}))}))}},{key:"renderTableData",value:function(){var e=this,t=this.state.data;return t&&t.map((function(t,a){var n=(0,i.default)(t.startDate).format("DD-MM-YYYY"),l=(0,i.default)(t.endDate).format("DD-MM-YYYY");return{key:a,title:t.title,startDate:n,endDate:l,view:[r.default.createElement("a",{href:"/viewResearch?id="+t.proposalId},r.default.createElement(o.Tooltip,{placement:"top",title:"Research"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"eye"}))),r.default.createElement("a",{href:"/acceptanceLetter?id="+t.proposalId},r.default.createElement(o.Tooltip,{placement:"top",title:"Acceptance Letter"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"profile"})))],download:[r.default.createElement("a",{target:"_blank",href:e.state.reportURL&&""+u.default.documentURL+e.state.reportURL,onClick:function(){return e.handleClickOfReports(t.proposalId,0)}},r.default.createElement(o.Tooltip,{placement:"top",title:"Intermediate report"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"file"}))),r.default.createElement("a",{target:"_blank",href:e.state.reportURL&&""+u.default.documentURL+e.state.reportURL,onClick:function(){return e.handleClickOfReports(t.proposalId,2)}},r.default.createElement(o.Tooltip,{placement:"top",title:"Data report"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"file"}))),r.default.createElement("a",{target:"_blank",href:e.state.reportURL&&""+u.default.documentURL+e.state.reportURL,onClick:function(){return e.handleClickOfReports(t.proposalId,1)}},r.default.createElement(o.Tooltip,{placement:"top",title:"Final report"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"file"})))],action:[r.default.createElement("a",{href:"/viewNotification?id="+t.proposalId},r.default.createElement(o.Tooltip,{placement:"top",title:"Notification"},r.default.createElement(o.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"bell"})))],description:r.default.createElement(d.default,{dataItem:t})}}))}},{key:"render",value:function(){var e=this;document.title="Manage Research | "+p.default.PageTitle;var t={showSizeChanger:!1,showQuickJumper:!1,pageSize:this.state.pageSize,current:this.state.pageNumber,total:this.state.total,onChange:function(t){return e.onChangeOfPagination(t)}};return r.default.createElement("div",null,r.default.createElement(c.default,{propertyProps:this.props}),r.default.createElement(o.Card,{className:"cardcss",title:r.default.createElement("b",null,"Research"),extra:r.default.createElement(m,{style:{marginRight:"40px",width:"300px"},placeholder:"Please input title here",onSearch:this.onCustomSearch,onChange:this.handleSearchChange,enterButton:!0})},r.default.createElement(o.Table,{className:"gx-table-responsive",columns:g,expandedRowRender:function(e){return r.default.createElement("p",{style:{margin:0}},e.description)},dataSource:this.renderTableData(),pagination:t})))}}]),t}(l.Component);t.default=b},1333:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DataForDescriptionResearch=void 0;var n,l=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(0),o=(n=r)&&n.__esModule?n:{default:n};var i=t.DataForDescriptionResearch=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this.props.dataItem;return o.default.createElement("div",null,o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Background : "),void 0===e.background?o.default.createElement("span",null," N/A"):e.background)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Expected outcome : "),void 0===e.expectedOutcomes?o.default.createElement("span",null," N/A"):e.expectedOutcomes))),o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Objective: ")," ",void 0===e.objectives?o.default.createElement("span",null," N/A"):e.objectives)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Research domains: ")," ",void 0===e.researchDomain?o.default.createElement("span",null," N/A"):e.researchDomain))),o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Keyword : ")," ",void 0===e.keywords?o.default.createElement("span",null," N/A"):e.keywords)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Involves human subject : ")," ",void 0===e.humanSubjects?o.default.createElement("span",null," N/A"):!0===e.humanSubjects?"Yes":!1===e.humanSubjects?"No":e.humanSubjects))),o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Amount : ")," ",o.default.createElement("label",{value:"FJ"},"FJ$ "),void 0===e.amount?o.default.createElement("span",null," N/A"):e.amount)),o.default.createElement("div",{style:{width:"50%"}},o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Level of risk involved : ")," ",void 0===e.levelRisk?o.default.createElement("span",null," N/A"):e.levelRisk))))}}]),t}(r.Component);t.default=i}}]);