(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1327:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ManageRequest=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=a(0),o=p(n),r=a(21),s=a(36),i=p(a(29)),c=p(a(197)),u=p(a(1334)),d=p(a(46));function p(e){return e&&e.__esModule?e:{default:e}}a(37);var m=void 0,f=r.Modal.error,h=(r.Form.Item,r.Input.TextArea),k=(r.Input.Search,[{title:o.default.createElement("div",{style:{fontSize:14}},o.default.createElement("b",null,"Title")),dataIndex:"title",key:"name",ellipsis:!0},{title:o.default.createElement("div",{style:{fontSize:14}},o.default.createElement("b",null,"Request Id")),dataIndex:"requestId",key:"role",ellipsis:!0},{title:o.default.createElement("div",{style:{fontSize:14}},o.default.createElement("b",null,"Status")),dataIndex:"status",key:"status",ellipsis:!0},{title:o.default.createElement("div",{style:{fontSize:14}},o.default.createElement("b",null,"Action")),dataIndex:"action",key:"action"}]),y=t.ManageRequest=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleCancelMarkComplete=function(){a.setState({markCompleteModal:!1}),a.props.form.resetFields()},a.handleCancelApprove=function(){a.setState({approveModal:!1}),a.props.form.resetFields()},a.handleCancelReject=function(){a.setState({rejectModal:!1}),a.props.form.resetFields()},a.handleCancelMarkIncomplete=function(){a.setState({markIncompleteModal:!1}),a.props.form.resetFields()},a.handleChange=function(e){var t,l,n;a.setState((t={},l=e.target.name,n=e.target.value,l in t?Object.defineProperty(t,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[l]=n,t))},a.handleOkForMarkComplete=function(e){a.state.disabledMarkCompleteButton=!1,a.setState({disabledMarkCompleteButton:!1}),fetch(i.default.APIURL+"/markDataRequestComplete/"+e,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({commentForMarkComplete:a.state.commentForMarkComplete})}).then((function(e){return e.json()})).then((function(e){200===e.status?(a.state.disabledMarkCompleteButton=!1,a.setState({disabledMarkCompleteButton:!1}),a.props.history.push("/manageRequests"),s.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):500===e.status?a.props.history.push("/serverError"):400===e.status?a.props.history.push("/badRequest"):403===e.status&&a.props.history.push("/forbiddenRequest")})),a.setState({loading:!0}),setTimeout((function(){a.setState({loading:!1,disabledMarkCompleteButton:!1})}),1e3)},a.handleOkForApprove=function(e){a.state.disableApprove=!1,a.setState({disableApprove:!1}),fetch(i.default.APIURL+"/approveDataRequest/"+e,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({commentFoApprove:a.state.commentFoApprove})}).then((function(e){return e.json()})).then((function(e){200===e.status?(a.state.disableApprove=!1,a.setState({disableApprove:!1}),a.props.history.push("/manageRequests"),s.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):500===e.status?a.props.history.push("/serverError"):400===e.status?a.props.history.push("/badRequest"):403===e.status&&a.props.history.push("/forbiddenRequest")})),a.setState({loading:!0}),setTimeout((function(){a.setState({loading:!1,disableApprove:!1})}),1e3)},a.handleOkForMarkIncomplete=function(e){a.state.disabledMarkIncompleteButton=!1,a.setState({disabledMarkIncompleteButton:!1}),fetch(i.default.APIURL+"/markDataRequestIncomplete/"+e,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({commentForMarkIncomplete:a.state.commentForMarkIncomplete})}).then((function(e){return e.json()})).then((function(e){200===e.status?(a.state.disabledMarkIncompleteButton=!1,a.setState({disabledMarkIncompleteButton:!1}),a.props.history.push("/manageRequests"),s.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):500===e.status?a.props.history.push("/serverError"):400===e.status?a.props.history.push("/badRequest"):403===e.status&&a.props.history.push("/forbiddenRequest")})),a.setState({loading:!0}),setTimeout((function(){a.setState({loading:!1,disabledMarkIncompleteButton:!1})}),1e3)},a.handleOkForReject=function(e){a.state.disableReject=!1,a.setState({disableApprove:!1}),fetch(i.default.APIURL+"/rejectDataRequest/"+e,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({commentForReject:a.state.commentForReject})}).then((function(e){return e.json()})).then((function(e){200===e.status?(a.state.disableReject=!1,a.setState({disableReject:!1}),a.props.history.push("/manageRequests"),s.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):500===e.status?a.props.history.push("/serverError"):400===e.status?a.props.history.push("/badRequest"):403===e.status&&a.props.history.push("/forbiddenRequest")})),a.setState({loading:!0}),setTimeout((function(){a.setState({loading:!1,disableReject:!1})}),1e3)},a.state={data:[],dataLength:"",docketNo:"",fullName:"",commentForMarkComplete:"",commentForMarkIncomplete:"",commentFoApprove:"",commentForReject:""},a.handleButtonClick=a.handleButtonClick.bind(a),m=a,a.getAllDataRequest=a.getAllDataRequest.bind(a),a.onPageChange=a.onPageChange.bind(a),a.handleSearchText=a.handleSearchText.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"componentDidMount",value:function(){this.getAllDataRequest(1,"")}},{key:"onShowSizeChange",value:function(e,t){var a=e,l=t;m.getAllUserData(a,l,"")}},{key:"onPageChange",value:function(e,t){var a=e,l=t;m.getAllUserData(a,l,"")}},{key:"getAllDataRequest",value:function(e,t){var a=this;fetch(i.default.APIURL+"/dataRequests/"+e,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include"}).then((function(e){return e.json()})).then((function(e){200===e.status?a.setState({data:e.dataRequests,dataLength:e.length}):300===e.status?s.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===e.status?(a.setState({}),f({title:d.default.SessionExpired+e.message,content:"",onOk:function(){m.props.history.push("/signIn")}})):500===e.status?(a.setState({}),a.props.history.push("/serverError")):400===e.status?(a.setState({}),a.props.history.push("/badRequest")):403===e.status&&(a.setState({}),a.props.history.push("/forbiddenRequest"))}))}},{key:"handleSearchText",value:function(e){var t=e.target.value;this.getAllUserData(pageNo,10,t)}},{key:"handleButtonClick",value:function(){this.props.history.push("/inviteUser")}},{key:"handleMarkCompleteClick",value:function(e,t){this.setState({markCompleteModal:!0,docketNo:t,fullName:e})}},{key:"handleApproveClick",value:function(e,t){this.setState({approveModal:!0,docketNo:t,fullName:e})}},{key:"handleRejectClick",value:function(e,t){this.setState({rejectModal:!0,docketNo:t,fullName:e})}},{key:"handleMarkIncompleteClick",value:function(e,t){this.setState({markIncompleteModal:!0,docketNo:t,fullName:e})}},{key:"renderTableData",value:function(){var e=this;return this.state.data.map((function(t,a){return{key:a,title:t.fullName,requestId:t.docketNo,status:t.requestStatus,action:[o.default.createElement("a",{href:"/viewDataRequest?docketNo="+t.docketNo},o.default.createElement(r.Tooltip,{placement:"top",title:"View"},o.default.createElement(r.Icon,{style:{marginRight:"15px",fontSize:"17px",color:""},type:"eye"}))),!1===t.isCompleted?o.default.createElement(r.Tooltip,{placement:"top",title:"Mark complete"},o.default.createElement(r.Icon,{onClick:function(){return e.handleMarkCompleteClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"green"},type:"check-circle",theme:"outlined"})):o.default.createElement(r.Tooltip,{placement:"top",title:"Mark complete"},o.default.createElement(r.Icon,{onClick:function(){return e.handleMarkCompleteClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"grey"},type:"check-circle",theme:"outlined"})),!1===t.isInCompleted&&!1===t.isCompleted?o.default.createElement(r.Tooltip,{placement:"top",title:"Mark Incomplete"},o.default.createElement(r.Icon,{onClick:function(){return e.handleMarkIncompleteClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"red"},type:"close-circle",theme:"outlined"})):o.default.createElement(r.Tooltip,{placement:"top",title:"Mark Incomplete"},o.default.createElement(r.Icon,{onClick:function(){return e.handleMarkIncompleteClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"grey"},type:"close-circle",theme:"outlined"})),!1===t.isApproved?o.default.createElement(r.Tooltip,{placement:"top",title:"Approve"},o.default.createElement(r.Icon,{onClick:function(){return e.handleApproveClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"green"},type:"check-circle",theme:"outlined"})):o.default.createElement(r.Tooltip,{placement:"top",title:"Approve"},o.default.createElement(r.Icon,{onClick:function(){return e.handleApproveClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"grey"},type:"check-circle",theme:"outlined"})),!1===t.isRejected&&!1===t.isApproved?o.default.createElement(r.Tooltip,{placement:"top",title:"Reject"},o.default.createElement(r.Icon,{onClick:function(){return e.handleRejectClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"red"},type:"close-circle",theme:"outlined"})):o.default.createElement(r.Tooltip,{placement:"top",title:"Reject"},o.default.createElement(r.Icon,{onClick:function(){return e.handleRejectClick(t.fullName,t.docketNo)},style:{marginRight:"15px",fontSize:"16px",color:"grey"},type:"close-circle",theme:"outlined"}))],description:o.default.createElement(u.default,{dataItem:t})}}))}},{key:"render",value:function(){var e=this;document.title="Manage Requests | "+d.default.PageTitle;var t=this.props.form.getFieldDecorator;return o.default.createElement("div",null,o.default.createElement(c.default,{propertyProps:this.props}),o.default.createElement(r.Card,{className:"cardcss",title:o.default.createElement("b",null,"Active Requests"),extra:o.default.createElement("div",{style:{display:"inline-flex"}},o.default.createElement(r.Input,{onChange:this.handleSearchText,style:{marginRight:"14px"},type:"text",placeholder:"Search"}))},o.default.createElement(r.Table,{className:"gx-table-responsive",columns:k,pagination:!1,expandedRowRender:function(e){return o.default.createElement("p",{style:{margin:0}},e.description)},dataSource:this.renderTableData()}),o.default.createElement(r.Modal,{visible:this.state.markCompleteModal,title:o.default.createElement(r.Tooltip,{title:this.state.fullName},o.default.createElement("span",{style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},"Add comments  (Title : "+this.state.fullName+")")),onOk:function(){return e.handleOkForMarkComplete(e.state.docketNo)},onCancel:this.handleCancelMarkComplete,footer:[o.default.createElement(r.Button,{key:"back",onClick:this.handleCancelMarkComplete},"Cancel"),o.default.createElement(r.Button,{key:"submit",type:"primary",loading:this.state.loading,disabled:this.state.disabledMarkCompleteButton,onClick:function(){return e.handleOkForMarkComplete(e.state.docketNo)}},"Mark Complete")]},t("commentForMarkComplete",{})(o.default.createElement(h,{setFieldsValue:this.state.commentForMarkComplete,onChange:this.handleChange,name:"commentForMarkComplete",rows:4,placeholder:"Please input your comment"}))),o.default.createElement(r.Modal,{visible:this.state.markIncompleteModal,title:o.default.createElement(r.Tooltip,{title:this.state.fullName},o.default.createElement("span",{style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},"Add comments  (Title : "+this.state.fullName+")")),onOk:function(){return e.handleOkForMarkIncomplete(e.state.docketNo)},onCancel:this.handleCancelMarkIncomplete,footer:[o.default.createElement(r.Button,{key:"back",onClick:this.handleCancelMarkIncomplete},"Cancel"),o.default.createElement(r.Button,{key:"submit",type:"primary",loading:this.state.loading,disabled:this.state.disabledMarkIncompleteButton,onClick:function(){return e.handleOkForMarkIncomplete(e.state.docketNo)}},"Mark Incomplete")]},t("commentForMarkIncomplete",{})(o.default.createElement(h,{setFieldsValue:this.state.commentForMarkIncomplete,onChange:this.handleChange,name:"commentForMarkIncomplete",rows:4,placeholder:"Please input your comment"}))),o.default.createElement(r.Modal,{visible:this.state.approveModal,title:o.default.createElement(r.Tooltip,{title:this.state.fullName},o.default.createElement("span",{style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},"Add comments  (Title : "+this.state.fullName+")")),onOk:function(){return e.handleOkForApprove(e.state.docketNo)},onCancel:this.handleCancelApprove,footer:[o.default.createElement(r.Button,{key:"back",onClick:this.handleCancelApprove},"Cancel"),o.default.createElement(r.Button,{key:"submit",type:"primary",loading:this.state.loading,disabled:this.state.disableApprove,onClick:function(){return e.handleOkForApprove(e.state.docketNo)}},"Approve")]},t("commentForApprove",{})(o.default.createElement(h,{setFieldsValue:this.state.commentFoApprove,onChange:this.handleChange,name:"commentFoApprove",rows:4,placeholder:"Please input your comment"}))),o.default.createElement(r.Modal,{visible:this.state.rejectModal,title:o.default.createElement(r.Tooltip,{title:this.state.fullName},o.default.createElement("span",{style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},"Add comments  (Title : "+this.state.fullName+")")),onOk:function(){return e.handleOkForReject(e.state.docketNo)},onCancel:this.handleCancelReject,footer:[o.default.createElement(r.Button,{key:"back",onClick:this.handleCancelReject},"Cancel"),o.default.createElement(r.Button,{key:"submit",type:"primary",loading:this.state.loading,disabled:this.state.disableReject,onClick:function(){return e.handleOkForReject(e.state.docketNo)}},"Reject")]},t("commentForReject",{})(o.default.createElement(h,{setFieldsValue:this.state.commentForReject,onChange:this.handleChange,name:"commentForReject",rows:4,placeholder:"Please input your comment"}))),o.default.createElement("br",null),o.default.createElement("div",{style:{float:"right"}},o.default.createElement(r.Pagination,{total:this.state.dataLength,onChange:this.onPageChange}))))}}]),t}(n.Component),g=r.Form.create()(y);t.default=g},1334:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DataForDescriptionUserManagement=void 0;var l=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),n=a(0),o=s(n),r=s(a(3));function s(e){return e&&e.__esModule?e:{default:e}}var i=t.DataForDescriptionUserManagement=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),l(t,[{key:"render",value:function(){var e=this.props.dataItem,t=(0,r.default)(e.createdAt).format("DD-MM-YYYY");return o.default.createElement("div",null,o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Email : "),void 0===e.email?o.default.createElement("span",null," N/A"):e.email)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Highest qualification : "),void 0===e.highestQualification?o.default.createElement("span",null," N/A"):e.highestQualification))),o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Created at : ")," ",void 0===e.createdAt?o.default.createElement("span",null," N/A"):t)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Department : ")," ",void 0===e.department?o.default.createElement("span",null," N/A"):e.department))),o.default.createElement("div",{style:{display:"flex",marginBottom:"1.5%"}},o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Principle field of interest to review : ")," ",void 0===e.principleField?o.default.createElement("span",null," N/A"):e.principleField)),o.default.createElement("div",{style:{width:"50%"}}," ",o.default.createElement("span",{style:{wordBreak:"break-all"}},o.default.createElement("b",null,"Job title : ")," ",void 0===e.jobTitle?o.default.createElement("span",null," N/A"):e.jobTitle))))}}]),t}(n.Component);t.default=i}}]);