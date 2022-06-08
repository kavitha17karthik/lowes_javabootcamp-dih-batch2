<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<html>
<head>
	<title>Registration</title>
</head>

<body>
<p> ${exception.errorMsg}</p>
<br>
<h2> New User Registration Page</h2>

<spring:url value="/" var="contextPath" htmlEscape="true" />

<form:form method="POST" action="${contextPath}/register">
   <table>
     <tr>
        <td><form:label path="name">FullName:</form:label></td>
        <td><form:input path="name" /></td>
     </tr>
     <tr>
        <td><form:label path="username">UserName:</form:label></td>
        <td><form:input path="username" /></td>
     </tr>
     <tr>
        <td><form:label path="password">Password:</form:label></td>
        <td><form:password path="password" /></td>
     </tr>
     <tr>
        <td><form:label path="email">EmailID:</form:label></td>
        <td><form:input path="email" /></td>
     </tr>
     <tr>
        <td colspan="2">
          <input type="submit" value="Register"/>
        </td>
     </tr>
     <tr>
         <td>
             <a href="${contextPath}">Home</a>
         </td>
     </tr>
</table>
</form:form>
</body>
</html>