(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1293:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageResearchInvestigator=void 0;var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),o=a(0),l=f(o),n=a(21),s=f(a(3)),i=a(36),p=f(a(29)),u=f(a(197)),d=f(a(1333)),c=f(a(46));function f(e){return e&&e.__esModule?e:{default:e}}var m=void 0,h=n.Select.Option,y=n.Modal.error,g=[{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"Title")),dataIndex:"title",key:"title",ellipsis:!0,width:"30%"},{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"Start Date")),dataIndex:"startDate",key:"startDate",ellipsis:!0},{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"End Date")),dataIndex:"endDate",key:"endDate",ellipsis:!0},{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"Status")),dataIndex:"status",key:"status",ellipsis:!0},{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"View")),dataIndex:"view",key:"view",width:"10%"},{title:l.default.createElement("div",{style:{fontSize:14}},l.default.createElement("b",null,"Submit")),dataIndex:"submit",key:"submit",width:"20%"}],b=t.ManageResearchInvestigator=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.HandleReportClicked=function(e,t,r,o,l,n,s){l&&!r?a.props.history.push("/reportSubmission?id="+e+"&type=0"):n&&!o?a.props.history.push("/reportSubmission?id="+e+"&type=1"):a.setState({showModalToSelectReportType:!0,proposalId:e,proposalTitle:t,isIntermediateSubmit:r,isFinalSubmit:o})},a.HandleDataClicked=function(e,t,r,o){localStorage.setItem("proposalTitle",t),localStorage.setItem("proposalId",e),console.log("data clicked.............."),a.setState({proposalId:e,proposalTitle:t}),r?a.props.history.push("/reportSubmission?id="+e+"&type=2"):fetch(p.default.APIURL+"/saveReportType",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({proposalId:e,reportType:"Data Report"})}).then((function(e){return e.json()})).then((function(t){200===t.status?a.props.history.push("/reportSubmission?id="+e+"&type="+t.reportData.reportType):300===t.status?i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?y({title:c.default.SessionExpired+t.message,content:"",onOk:function(){m.props.history.push("/signIn")}}):500===t.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/serverError")):400===t.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/badRequest")):403===t.status&&(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/forbiddenRequest"))}))},a.amendmentRequestClicked=function(e,t,r){r&&!0===r?a.props.history.push("/amendmentRequest?id="+e):fetch(p.default.APIURL+"/amendmentRequest",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({proposalId:e,title:t})}).then((function(e){return e.json()})).then((function(t){200===t.status?a.props.history.push("/amendmentRequest?id="+e):300===t.status?i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?y({title:c.default.SessionExpired+t.message,content:"",onOk:function(){m.props.history.push("/signIn")}}):500===t.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/serverError")):400===t.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/badRequest")):403===t.status&&(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/forbiddenRequest"))}))},a.HandleSelectChange=function(e){console.log("on report select ***********"),console.log(e),a.setState({reportType:e})},a.handleSubmit_SelectReportType=function(e){e.preventDefault(),localStorage.setItem("proposalTitle",a.state.proposalTitle),a.props.form.validateFields(["reportType"],(function(e,t){console.log("error********",e),console.log("value********",t);var r=void 0;e&&console.log(e),e||("0"===a.state.reportType?r="Intermediate Report":"1"===a.state.reportType&&(r="Final Report"),fetch(p.default.APIURL+"/saveReportType",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({proposalId:a.state.proposalId,reportType:r})}).then((function(e){return e.json()})).then((function(e){200===e.status?(a.setState({reportData:e.reportData}),a.props.history.push("/reportSubmission?id="+a.state.proposalId+"&type="+e.reportData.reportType),i.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):300===e.status?i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===e.status?y({title:c.default.SessionExpired+e.message,content:"",onOk:function(){m.props.history.push("/signIn")}}):500===e.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/serverError")):400===e.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/badRequest")):403===e.status&&(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),a.props.history.push("/forbiddenRequest"))})))}))},a.handleCancel_selectReportType=function(){a.setState({showModalToSelectReportType:!1}),a.props.form.resetFields()},a.state={data:[],showModalToSelectReportType:!1,proposalTitle:"",reportType:"",proposalId:"",intermediateReportClicked:!1,isIntermediateSubmit:!1,isFinalSubmit:!1,reportData:""},m=a,a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentWillMount",value:function(){var e=this;fetch(p.default.APIURL+"/getAllResearchForInvestigator",{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include"}).then((function(e){return e.json()})).then((function(t){200===t.status?e.setState({data:t.researchData}):300===t.status?i.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===t.status?y({title:c.default.SessionExpired+t.message,content:"",onOk:function(){m.props.history.push("/signIn")}}):500===t.status?e.props.history.push("/serverError"):400===t.status?e.props.history.push("/badRequest"):403===t.status&&e.props.history.push("/forbiddenRequest")}))}},{key:"renderTableData",value:function(){var e=this;return this.state.data.map((function(t,a){var r=(0,s.default)(t.startDate).format("DD-MM-YYYY"),o=(0,s.default)(t.endDate).format("DD-MM-YYYY");return{key:a,title:t.title,startDate:r,endDate:o,status:[void 0===t.status?"In Process":t.status],view:[l.default.createElement("a",{href:"/viewResearch?id="+t.proposalId},l.default.createElement(n.Tooltip,{placement:"top",title:"Research"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"eye"}))),l.default.createElement("a",{href:"/acceptanceLetter?id="+t.proposalId},l.default.createElement(n.Tooltip,{placement:"top",title:"Acceptance Letter"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"profile"})))],submit:[t.isDataReportSubmitted?l.default.createElement("a",null,l.default.createElement(n.Tooltip,{placement:"top",title:"Data"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px",color:"grey"},type:"file-add"}))):l.default.createElement("a",{onClick:function(){return e.HandleDataClicked(t.proposalId,t.title,t.isDataReportType,t.reportType)}},l.default.createElement(n.Tooltip,{placement:"top",title:"Data"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px"},type:"file-add"}))),l.default.createElement("a",{onClick:function(){e.HandleReportClicked(t.proposalId,t.title,t.isIntermediateReportSubmitted,t.isFinalReportSubmitted,t.isIntermediateReportType,t.isFinalReportType,t.reportType)}},l.default.createElement(n.Tooltip,{placement:"top",title:"Report"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px"},type:"file-text"}))),l.default.createElement("a",{href:"/termExtensionRequest?id="+t.proposalId},l.default.createElement(n.Tooltip,{placement:"top",title:"Request"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px"},type:"form"}))),"Draft"===t.status?l.default.createElement("a",{href:"/amendmentRequest?id="+t.proposalId},l.default.createElement(n.Tooltip,{placement:"top",title:"Edit amendment request"},l.default.createElement(n.Icon,{type:"edit",style:{marginRight:"15px",fontSize:"17px",color:""}}))):t.isAppliedForAmendment?l.default.createElement("a",null,l.default.createElement(n.Tooltip,{placement:"top",title:"Amendment request"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px",color:"grey"},type:"file"}))):l.default.createElement("a",{onClick:function(){return e.amendmentRequestClicked(t.proposalId,t.title,t.isAmendment)}},l.default.createElement(n.Tooltip,{placement:"top",title:"Amendment request"},l.default.createElement(n.Icon,{style:{marginRight:"15px",fontSize:"17px"},type:"file"})))],description:l.default.createElement(d.default,{dataItem:t})}}))}},{key:"render",value:function(){var e=this;document.title="Manage Research | "+c.default.PageTitle;var t=this.props.form.getFieldDecorator;return l.default.createElement("div",null,l.default.createElement(u.default,{propertyProps:this.props}),l.default.createElement(n.Card,{className:"cardcss",title:l.default.createElement("b",null,"Research")},l.default.createElement(n.Table,{className:"gx-table-responsive",columns:g,expandedRowRender:function(e){return l.default.createElement("p",{style:{margin:0}},e.description)},dataSource:this.renderTableData()}),l.default.createElement(n.Modal,{visible:this.state.showModalToSelectReportType,title:l.default.createElement(n.Tooltip,{placement:"bottom",title:this.state.proposalTitle,style:{width:900}},l.default.createElement("span",{style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},"Select report type (Title : "+this.state.proposalTitle+" ) ")),onCancel:function(){return e.handleCancel_selectReportType()},footer:[l.default.createElement(l.default.Fragment,null,l.default.createElement(n.Button,{onClick:this.handleCancel_selectReportType},"Cancel"),l.default.createElement(n.Button,{type:"primary",onClick:this.handleSubmit_SelectReportType,htmlType:"submit"},"Submit"))]},l.default.createElement(n.Form,null,l.default.createElement(n.Form.Item,{label:"Select report type : "},t("reportType",{rules:[{required:!0,message:c.default.ReportTypeValidation}]})(l.default.createElement(n.Select,{name:"reportType",setFieldsValue:this.state.reportType,onChange:this.HandleSelectChange,placeholder:"Select report type",style:{width:"180px"}},this.state.isIntermediateSubmit?l.default.createElement(h,{value:"0",disabled:!0},"Intermediate Report"):l.default.createElement(h,{value:"0"},"Intermediate Report"),this.state.isFinalSubmit?l.default.createElement(h,{value:"1",disabled:!0},"Final Report"):l.default.createElement(h,{value:"1"},"Final Report"))))))))}}]),t}(o.Component),E=n.Form.create()(b);t.default=E},1333:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DataForDescriptionResearch=void 0;var r,o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),l=a(0),n=(r=l)&&r.__esModule?r:{default:r};var s=t.DataForDescriptionResearch=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"render",value:function(){var e=this.props.dataItem;return n.default.createElement("div",null,n.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Background : "),void 0===e.background?n.default.createElement("span",null," N/A"):e.background)),n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Expected outcome : "),void 0===e.expectedOutcomes?n.default.createElement("span",null," N/A"):e.expectedOutcomes))),n.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Objective: ")," ",void 0===e.objectives?n.default.createElement("span",null," N/A"):e.objectives)),n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Research domains: ")," ",void 0===e.researchDomain?n.default.createElement("span",null," N/A"):e.researchDomain))),n.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Keyword : ")," ",void 0===e.keywords?n.default.createElement("span",null," N/A"):e.keywords)),n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Involves human subject : ")," ",void 0===e.humanSubjects?n.default.createElement("span",null," N/A"):!0===e.humanSubjects?"Yes":!1===e.humanSubjects?"No":e.humanSubjects))),n.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},n.default.createElement("div",{style:{width:"50%"}}," ",n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Amount : ")," ",n.default.createElement("label",{value:"FJ"},"FJ$ "),void 0===e.amount?n.default.createElement("span",null," N/A"):e.amount)),n.default.createElement("div",{style:{width:"50%"}},n.default.createElement("span",{style:{wordBreak:"break-all"}},n.default.createElement("b",null,"Level of risk involved : ")," ",void 0===e.levelRisk?n.default.createElement("span",null," N/A"):e.levelRisk))))}}]),t}(l.Component);t.default=s}}]);