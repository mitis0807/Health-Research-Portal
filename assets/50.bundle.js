(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{1325:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManagement=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e},r=function(){function e(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,o,a){return o&&e(t.prototype,o),a&&e(t,a),t}}(),n=o(0),l=m(n),s=o(21),i=o(32),u=o(36),d=m(o(29)),p=m(o(197)),c=m(o(46));o(37);var h=m(o(3));function m(e){return e&&e.__esModule?e:{default:e}}var f=s.Form.Item,b=(s.Modal.error,s.Input.TextArea),g=t.UserManagement=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.dummyRequestForquarterlyReports=function(e){var t=e.file,a=e.onSuccess;console.log("dummyRequestForReports",t),o.setState({quarterlyReport:t},(function(){})),setTimeout((function(){a("ok")}),0)},o.dummyRequestForAnnualReports=function(e){var t=e.file,a=e.onSuccess;console.log("dummyRequestForReports",t),o.setState({annualReport:t},(function(){})),setTimeout((function(){a("ok")}),0)},o.handleOkOfQuarterlyModal=function(e){e.preventDefault(),o.props.form.validateFields(["quarterlyReport","commentForQuarterlyReport"],(function(e,t){if(console.log("error********",e),console.log("value********",t),!e){o.setState({disableSubmit:!0}),console.log("in if of handleok"),console.log(t.commentForQuarterlyReport),console.log(o.state.quarterlyReport);var a=new FormData;a.append("reportType",0),a.append("commentForQuarterlyReport",t.commentForQuarterlyReport),a.append("file",o.state.quarterlyReport),fetch(d.default.APIURL+"/universityUserReports",{method:"POST",credentials:"include",body:a}).then((function(e){return e.json()})).then((function(e){200===e.status?(u.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.setState({disableSubmit:!1}),o.props.history.push("/manageReports")):300===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):401===e.status?o.setState({disableSubmit:!1}):500===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/serverError")):400===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/badRequest")):403===e.status&&(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/forbiddenRequest"))}))}}))},o.handleOkOfAnnualModal=function(e){e.preventDefault(),o.props.form.validateFields(["annualReport","commentForAnnualReport"],(function(e,t){if(console.log("error********",e),console.log("value********",t),!e){o.setState({disableSubmit:!0}),console.log("in if of handleok"),console.log(t.commentForAnnualReport),console.log(o.state.annualReport);var a=new FormData;a.append("reportType",1),a.append("commentForAnnualReport",t.commentForAnnualReport),a.append("file",o.state.annualReport),fetch(d.default.APIURL+"/universityUserReports",{method:"POST",credentials:"include",body:a}).then((function(e){return e.json()})).then((function(e){200===e.status?(u.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.setState({disableSubmit:!1}),o.props.history.push("/manageReports")):300===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):401===e.status?o.setState({disableSubmit:!1}):500===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/serverError")):400===e.status?(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/badRequest")):403===e.status&&(o.setState({disableSubmit:!1}),u.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/forbiddenRequest"))}))}}))},o.state={data:[],isModalVisibleForQuarterlyReport:!1,isModalVisibleForAnnualReport:!1,commentForAnnualReport:"",quarterlyReport:"",annualReport:"",commentForQuarterlyReport:"",disableSubmit:!1,DateAndMonthValidationForQuarterly:!1,DateAndMonthValidationForAnnual:!1},o.showModalForQuarterlyReportUpload=o.showModalForQuarterlyReportUpload.bind(o),o.handleCancel=o.handleCancel.bind(o),o.handleCancelForAnnualReport=o.handleCancelForAnnualReport.bind(o),o.handleOkOfQuarterlyModal=o.handleOkOfQuarterlyModal.bind(o),o.handleOkOfAnnualModal=o.handleOkOfAnnualModal.bind(o),o.dummyRequestForAnnualReports=o.dummyRequestForAnnualReports.bind(o),o.showModalForAnnualReportUpload=o.showModalForAnnualReportUpload.bind(o),o,o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){var e=this;console.log("in component did mount downloadReportUniversityUser");var t=[2,5,8,11];console.log("validMonth"),console.log(t);var o=(0,h.default)().month(),a=(0,h.default)().date();console.log(o),console.log(a),console.log(t.includes(o)),t.includes(o)&&(0,h.default)().format("D")>=15&&(console.log("in if of the function"),this.setState({DateAndMonthValidationForQuarterly:!0}));[0].includes(o)&&(0,h.default)().format("D")>=15&&(console.log("in if of the function"),this.setState({DateAndMonthValidationForAnnual:!0})),console.log(this.props.authUser),console.log(this.props.authUser.id),fetch(d.default.APIURL+"/downloadReportUniversityUser",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include"}).then((function(e){return e.json()})).then((function(t){200===t.status?e.setState({disableSubmit:!1,data:t.reportData}):300===t.status?(e.setState({disableSubmit:!1}),u.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):401===t.status?e.setState({disableSubmit:!1}):500===t.status?(e.setState({disableSubmit:!1}),u.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),e.props.history.push("/serverError")):400===t.status?(e.setState({disableSubmit:!1}),u.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),e.props.history.push("/badRequest")):403===t.status&&(e.setState({disableSubmit:!1}),u.toast.error(t.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),e.props.history.push("/forbiddenRequest"))}))}},{key:"handleCancel",value:function(){this.setState({isModalVisibleForQuarterlyReport:!1})}},{key:"handleCancelForAnnualReport",value:function(){this.setState({isModalVisibleForAnnualReport:!1})}},{key:"showModalForQuarterlyReportUpload",value:function(){this.setState({isModalVisibleForQuarterlyReport:!0,isModalVisibleForAnnualReport:!1})}},{key:"showModalForAnnualReportUpload",value:function(){this.setState({isModalVisibleForAnnualReport:!0,isModalVisibleForQuarterlyReport:!1})}},{key:"onChangeOfReports",value:function(){console.log("on cjhange")}},{key:"beforeUpload",value:function(e){console.log("brefore upload");var t=e.size/1024/1024<5;console.log("in before upload",e.size),console.log("in before upload isLt2M",t);var o="application/vnd.openxmlformats-officedocument.wordprocessingml.document"===e.type||"application/docx"===e.type||"application/vnd.ms-excel"===e.type;return o?!1===t&&u.toast.error("File size should be less than 5MB",{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):u.toast.error("You can only upload JPG/PNG file!",{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o&&t}},{key:"render",value:function(){console.log("in render of manage report university user"),console.log("this.state.DateAndMonthValidationForQuarterly"),console.log(this.state.DateAndMonthValidationForQuarterly),document.title="Manage Reports | "+c.default.PageTitle;var e=this.props.form.getFieldDecorator,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}};return l.default.createElement("div",null,l.default.createElement(p.default,{propertyProps:this.props}),l.default.createElement(s.Card,{className:"cardcss",title:l.default.createElement("b",null,"Upload Reports"),extra:l.default.createElement("div",{style:{display:"inline-flex"}})},l.default.createElement(s.Form,null,l.default.createElement(f,a({},t,{label:"Upload Quarterly Report "}),!0===this.state.DateAndMonthValidationForQuarterly&&[l.default.createElement(s.Button,{onClick:this.showModalForQuarterlyReportUpload},l.default.createElement(s.Icon,{type:"upload"})," Click to Upload"),l.default.createElement("span",null,this.state.data&&this.state.data.quarterly&&this.state.data.quarterly.name)],!1===this.state.DateAndMonthValidationForQuarterly&&[l.default.createElement(s.Button,{disabled:!0,onClick:this.showModalForQuarterlyReportUpload},l.default.createElement(s.Icon,{type:"upload"})," Click to Upload"),l.default.createElement("span",null,this.state.data&&this.state.data.quarterly&&this.state.data.quarterly.name)]),l.default.createElement(f,a({},t,{label:"Upload Annual Report "}),!0===this.state.DateAndMonthValidationForAnnual&&[l.default.createElement(s.Button,{onClick:this.showModalForAnnualReportUpload},l.default.createElement(s.Icon,{type:"upload"})," Click to Upload"),l.default.createElement("span",null,this.state.data&&this.state.data.annual&&this.state.data.annual.name)],!1===this.state.DateAndMonthValidationForAnnual&&[l.default.createElement(s.Button,{disabled:!0,onClick:this.showModalForAnnualReportUpload},l.default.createElement(s.Icon,{type:"upload"})," Click to Upload"),l.default.createElement("span",null,this.state.data&&this.state.data.annual&&this.state.data.annual.name)])),l.default.createElement(s.Modal,{title:"Quarterly Report",visible:this.state.isModalVisibleForQuarterlyReport,onCancel:this.handleCancel,onOk:this.handleOkOfQuarterlyModal},l.default.createElement(s.Form,null,l.default.createElement(f,a({},t,{label:"Comments"}),e("commentForQuarterlyReport",{rules:[{required:!0,message:"Required"}]})(l.default.createElement(b,{setFieldsValue:this.state.commentForQuarterlyReport,onChange:this.handleChange,name:"commentForQuarterlyReport",rows:4,placeholder:"Please input your comment"}))),l.default.createElement(f,a({},t,{label:"Upload"}),e("quarterlyReport",{rules:[{required:!0,message:"Required"}]})(l.default.createElement(s.Upload,{fileList:this.state&&this.state.quarterlyReport?[this.state.quarterlyReport]:"",name:this.state&&this.state.quarterlyReport&&this.state.quarterlyReport.name,customRequest:this.dummyRequestForquarterlyReports,onChange:this.onChangeOfReports,beforeUpload:this.beforeUpload,showUploadList:{showRemoveIcon:!1}},l.default.createElement(s.Button,null,l.default.createElement(s.Icon,{type:"upload"})," Click to Upload")))))),l.default.createElement(s.Modal,{title:"Annual Report",visible:this.state.isModalVisibleForAnnualReport,onCancel:this.handleCancelForAnnualReport,onOk:this.handleOkOfAnnualModal},l.default.createElement(s.Form,null,l.default.createElement(f,a({},t,{label:"Comments"}),e("commentForAnnualReport",{rules:[{required:!0,message:"Required"}]})(l.default.createElement(b,{setFieldsValue:this.state.commentForAnnualReport,onChange:this.handleChange,name:"commentForAnnualReport",rows:4,placeholder:"Please input your comment"}))),l.default.createElement(f,a({},t,{label:"Upload"}),e("annualReport",{rules:[{required:!0,message:"Required"}]})(l.default.createElement(s.Upload,{fileList:this.state&&this.state.annualReport?[this.state.annualReport]:"",beforeUpload:this.beforeUpload,name:this.state&&this.state.annualReport&&this.state.annualReport.name,customRequest:this.dummyRequestForAnnualReports,onChange:this.onChangeOfReports,showUploadList:{showRemoveIcon:!1}},l.default.createElement(s.Button,null,l.default.createElement(s.Icon,{type:"upload"})," Click to Upload"))))))))}}]),t}(n.Component),y=s.Form.create()(g);t.default=(0,i.connect)((function(e){return{authUser:e.auth.authUser}}))(y)}}]);