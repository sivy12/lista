package eu.programisci.proxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulServer;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableZuulServer
@SpringBootApplication()
@EnableCaching
@EnableScheduling
@EnableDiscoveryClient
public class ProxyMain {

  public static void main(String[] args) {
    SpringApplication.run(ProxyMain.class, args);
  }
}
