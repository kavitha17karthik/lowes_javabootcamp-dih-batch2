package com.labs.spring.boot.Endpoints;

import java.net.HttpURLConnection;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomActuatorEndpoints implements HealthIndicator {
	
	Logger logger = LoggerFactory.getLogger(CustomActuatorEndpoints.class);
	
	@Override
	public Health health() {
		try
		{
			//try to access some url and show their status..by setting management.security.enabled=false
			//URL lowesUrl = new URL("https://www.lowesbagalore.com");
			URL lowesUrl = new URL("https://www.lowes.com");
			HttpURLConnection conn = (HttpURLConnection) lowesUrl.openConnection();
			conn.setRequestMethod("GET");
			conn.connect();
			int resCode = conn.getResponseCode();
			if(resCode==200)
			{
				return Health.up().build();
			}
			else
			{
				return Health.down().withDetail("Error","Lowes ServerDown").build();
			}
			
		}catch(Exception e) {
			return Health.down().withDetail("Error","Server Not Available").build();
			
		}		
				
	}

}
 