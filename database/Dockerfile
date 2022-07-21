FROM postgres:14.4-alpine
VOLUME [ "/rest-db" ]
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]