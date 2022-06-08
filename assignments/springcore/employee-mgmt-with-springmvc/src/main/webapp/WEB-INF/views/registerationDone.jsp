<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Landing Page</title>
</head>
<body>
<spring:url value="/" var="contextPath" htmlEscape="true" />
<h1>New User Registration :Successful!</h1>

<p> <a href="${contextPath}/login">Login</a> </br>
<p>  <a href="${contextPath}">Home</a>
</body>
</html>
