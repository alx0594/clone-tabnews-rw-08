export class MethodNotAllowedError extends Error {
  constructor() {
    super("Méthod HTTP não permitido.");
    this.name = "MethodNotAllowedError";
    this.action = "Verificar o método HTTP utilizado.";
    this.statusCode = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InternaServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro inesperado ocorreu.", {
      cause,
    });
    this.name = "InternaServerError";
    this.action = "Entrar em contato com o suporte.";
    this.statusCode = statusCode || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ message, cause }) {
    super(message, {
      cause: cause,
    });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
