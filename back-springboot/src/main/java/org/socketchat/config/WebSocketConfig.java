package org.socketchat.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration // Se indica que la clase tiene 1 o más beans|
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    //Habilitar broker
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Por donde van a ingresar
        registry.enableSimpleBroker("/topic");
        // Path destino de los mensajes
        registry.setApplicationDestinationPrefixes("/app");
    }

    // Registrar lo endpoints
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Path para que el front se conecte al socket
        registry.addEndpoint("/chat-socket")
                .setAllowedOrigins("http://localhost:4200")
                .withSockJS();
    }
}
