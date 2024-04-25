(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1317:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.EditAnnouncement=void 0;var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(0),r=m(s),i=n(21),l=n(36),u=m(n(29)),c=m(n(197)),p=m(n(46));n(37);var d=m(n(241));function m(e){return e&&e.__esModule?e:{default:e}}i.Input.Search;var f=i.Input.TextArea,h=i.Form.Item,b=t.EditAnnouncement=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleCancel_EditAnnouncement=function(){console.log("on cancel click of edit announ"),n.props.history.push("/manageAnnouncement")},n.handleSubmit_EditAnnouncement=function(e){e.preventDefault(),n.props.form.validateFields((function(e,t){console.log("error********",e),console.log("value********",t),e||(n.setState({disableSubmit:!0}),fetch(u.default.APIURL+"/announcements/"+n.state.uid,{method:"PATCH",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},credentials:"include",body:JSON.stringify({data:{title:n.state.announcementTitle,content:n.state.announcementDescription}})}).then((function(e){return e.json()})).then((function(e){200===e.status?(l.toast.success(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),n.setState({disableSubmit:!1}),n.props.history.push("/manageAnnouncement")):300===e.status?(n.setState({disableSubmit:!1}),l.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1})):401===e.status?(n.setState({disableSubmit:!1}),error({title:p.default.SessionExpired+e.message,content:"",onOk:function(){that.props.history.push("/signIn")}})):500===e.status?(n.setState({disableSubmit:!1}),l.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),n.props.history.push("/serverError")):400===e.status?(n.setState({disableSubmit:!1}),l.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),n.props.history.push("/badRequest")):403===e.status&&(n.setState({disableSubmit:!1}),l.toast.error(e.message,{position:"top-center",autoClose:5e3,hideProgressBar:!0,closeOnClick:!0,pauseOnHover:!0,draggable:!1}),n.props.history.push("/forbiddenRequest"))})))}))},n.handleInputChange=function(e){var t,o,a;n.setState((t={},o=e.target.name,a=e.target.value,o in t?Object.defineProperty(t,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[o]=a,t))},n.state={announcementTitle:"",announcementDescription:"",uid:null,disableSubmit:!1},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.location.search,n=d.default.parse(t);console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"),console.log(n.id),this.setState({uid:n.id}),fetch(u.default.APIURL+"/announcementsById/"+n.id,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"}}).then((function(e){return e.json()})).then((function(t){200===t.status&&e.setState({announcementTitle:t.announcementData.title,announcementDescription:t.announcementData.content})}))}},{key:"componentDidMount",value:function(){console.log("************id*******",this.state.uid)}},{key:"render",value:function(){document.title="Edit Announcement | "+p.default.PageTitle;var e=this.props.form.getFieldDecorator,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:16}}};return r.default.createElement("div",null,r.default.createElement(c.default,{propertyProps:this.props}),r.default.createElement(i.Card,{className:"cardcss",title:r.default.createElement("b",null,"Announcements:Edit")},r.default.createElement(i.Card,{headStyle:{backgroundColor:"rgb(255,255,255)"},type:"inner",title:r.default.createElement(h,o({},t,{label:"Title : "}),e("announcementTitle",{initialValue:this.state.announcementTitle,rules:[{required:!0,message:p.default.AnnouncementTitleValidation}]})(r.default.createElement(i.Input,{type:"text",name:"announcementTitle",onChange:this.handleInputChange,setfieldsvalue:this.state.announcementTitle})))},r.default.createElement(h,o({},t,{label:"Description : "}),e("announcementDescription",{initialValue:this.state.announcementDescription,rules:[{required:!0,message:p.default.AnnouncementDescValidation}]})(r.default.createElement(f,{name:"announcementDescription",setfieldsvalue:this.state.announcementDescription,onChange:this.handleInputChange,style:{height:200,backgroundColor:"transparent"}}))),r.default.createElement(h,{wrapperCol:{xs:{span:24,offset:0},sm:{span:16,offset:8}}},r.default.createElement(i.Button,{href:"/manageAnnouncement"},"Cancel"),r.default.createElement(i.Button,{type:"primary",disabled:this.state.disableSubmit,onClick:this.handleSubmit_EditAnnouncement},"Update")))))}}]),t}(s.Component),g=i.Form.create()(b);t.default=g}}]);