(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1319:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ReportSubmission=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},a=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),n=o(0),s=f(n),l=o(21),i=o(36),p=f(o(29)),u=f(o(197)),c=f(o(46));o(37);var d=f(o(241));function f(e){return e&&e.__esModule?e:{default:e}}var m=l.Form.Item,h=(l.Input.Search,l.Input.TextArea),g=new FormData,b=t.ReportSubmission=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.handleSubmit_IntermediateReport=function(e){e.preventDefault(),o.props.form.validateFields((function(e,t){console.log("error********",e),console.log("value********",t)})),console.log("formData *******"),console.log(g),fetch(p.default.APIURL+"/updateReport",{method:"POST",credentials:"include",body:g}).then((function(e){return e.json()})).then((function(e){200===e.status?(g.delete("proposalId"),g.delete("reportType"),g.delete("comment"),g.delete("file"),i.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/manageResearch")):300===e.status?i.toast.error(c.default.ErrorInReport,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}):401===e.status?error({title:c.default.SessionExpired+e.message,content:"",onOk:function(){that.props.history.push("/signIn")}}):500===e.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/serverError")):400===e.status?(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/badRequest")):403===e.status&&(i.toast.error(c.default.ErrorInAssignReviewer,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o.props.history.push("/forbiddenRequest"))}))},o.handleInputChange=function(e){var t,r,a;console.log("on change of textarea title od announce..."),console.log(e.target.name),console.log(e.target.value),o.setState((t={},r=e.target.name,a=e.target.value,r in t?Object.defineProperty(t,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[r]=a,t))},o.customRequest=function(e){var t=e.file;console.log("file*************************"),console.log(t),o.setState({file:t})},o.handleFileChange=function(e){console.log("handlefilechange......"),console.log(e.file),g.append("proposalId",o.state.proposalId),"0"===o.state.reportType?g.append("reportType","Intermediate Report"):"1"===o.state.reportType?g.append("reportType","Final Report"):g.append("reportType","Data Report"),g.append("comment",o.state.comment),g.append("file",o.state.file)},o.beforeUpload=function(e){var t=e.size/1024/1024<=5;console.log("in before upload",e);var o="application/vnd.openxmlformats-officedocument.wordprocessingml.document"===e.type||"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"===e.type||"application/msword"===e.type||"application/vnd.ms-excel"===e.type;return o||i.toast.error(c.default.fileTypeValidation,{position:"top-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),o&&(t||i.toast.error(c.default.fileSizeValidation,{position:"top-center",autoClose:3e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})),o&&t},o.state={comment:"",file:"",proposalData:[],proposalId:"",reportType:""},o}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props);var t=this.props.location.search,o=d.default.parse(t);console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"),console.log(o.id),this.setState({proposalId:o.id,reportType:o.type});var r=o.id;fetch(p.default.APIURL+"/getResearchForView",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({proposalId:r})}).then((function(e){return e.json()})).then((function(t){200===t.status?e.setState({proposalData:t.proposalData}):500===t.status?e.props.history.push("/serverError"):400===t.status?e.props.history.push("/badRequest"):403===t.status&&e.props.history.push("/forbiddenRequest")}))}},{key:"render",value:function(){console.log("intermediate report details fron reducer store",this.props.intermediateReport),document.title="Intermediate Report | "+c.default.PageTitle;var e=this.props.form.getFieldDecorator,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}};return s.default.createElement("div",null,s.default.createElement(u.default,{propertyProps:this.props}),s.default.createElement(l.Form,{onSubmit:this.handleSubmit_IntermediateReport},s.default.createElement(l.Card,{className:"cardcss",title:s.default.createElement("b",null,"Research")},s.default.createElement(l.Card,{type:"inner",title:"0"===this.state.reportType?s.default.createElement("b",null,"Intermediate Report Submission"):"1"===this.state.reportType?s.default.createElement("b",null,"Final Report Submission"):s.default.createElement("b",null,"Data Submission")},s.default.createElement(m,r({},t,{label:"Title : ",style:{marginLeft:"-5px"}}),s.default.createElement("span",{name:"title",style:{display:"inline-block",width:"400px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},this.state.proposalData.title)),s.default.createElement(m,r({},t,{label:"Add Comments : ",style:{marginLeft:"-5px"}}),s.default.createElement(h,{name:"comment",setfieldsvalue:this.state.comment,onChange:this.handleInputChange,style:{height:50,backgroundColor:"transparent"}})),s.default.createElement(m,r({},t,{label:"Upload File : ",style:{marginLeft:"-5px"}}),e("file",{rules:[{required:!0,message:c.default.fileRequiredValidation}]})(s.default.createElement(l.Upload,{name:"file",fileList:this.state&&this.state.file?[this.state.file]:"",customRequest:this.customRequest,onChange:this.handleFileChange,beforeUpload:this.beforeUpload},s.default.createElement(l.Button,null,s.default.createElement(l.Icon,{type:"download"}),"Click to upload"))),s.default.createElement("div",null,s.default.createElement("span",{style:{color:"red"}},"*"," "),c.default.fileValidationMessage)),s.default.createElement(m,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},s.default.createElement(l.Button,{type:"primary",htmlType:"submit",disabled:this.state.disableSubmit},"Submit"))))))}}]),t}(n.Component),y=l.Form.create()(b);t.default=y}}]);