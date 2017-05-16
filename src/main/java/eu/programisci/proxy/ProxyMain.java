package eu.programisci.proxy;

import eu.programisci.proxy.configuration.WebAppConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulServer;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableZuulServer
@SpringBootApplication()
@EnableAutoConfiguration()
@EnableCaching
@EnableScheduling
@EnableDiscoveryClient
@Import({WebAppConfig.class})
public class ProxyMain {
    public static void main(String[] args) {
        SpringApplication.run(ProxyMain.class, args);
    }
}
