from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    port: int = 8000

    database_url: str = "postgresql://agentflow:agentflow@localhost:5433/agentflow"
    redis_url: str = "redis://localhost:6380"

    openai_api_key: str = ""
    anthropic_api_key: str = ""

    backend_url: str = "http://localhost:3101"
    internal_api_key: str = "internal-secret-key"


settings = Settings()
