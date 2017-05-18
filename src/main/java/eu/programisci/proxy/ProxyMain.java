package eu.programisci.proxy;

import eu.programisci.proxy.configuration.WebAppConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulServer;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.net.InetAddress;
import java.net.UnknownHostException;

@EnableZuulServer
@SpringBootApplication()
@EnableAutoConfiguration()
@EnableCaching
@EnableScheduling
@EnableDiscoveryClient
@Import({WebAppConfig.class})
@Slf4j
public class ProxyMain {
    public static void main(String[] args)throws UnknownHostException {
        SpringApplication pApp = new SpringApplication(ProxyMain.class);
        Environment pEnv = pApp.run(args).getEnvironment();
        final String pPort = pEnv.getProperty("server.port");
        final String pHost = InetAddress.getLocalHost().getHostAddress();
        log.info("Access URLs:\n----------------------------------------------------------\n\t" +
                        "Local: \t\thttp://{}:{}\n\t" +
                        "External: \thttp://{}:{}\n\t" +
                        "Szwagier: \thttp://{}:{}/swagger-ui.html\n----------------------------------------------------------",
                pHost, pPort,
                pHost, pPort,
                pHost, pPort);
    }
}
