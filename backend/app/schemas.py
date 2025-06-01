from pydantic import BaseModel

class ServiceBase(BaseModel):
    name: str
    url: str
    icon: str = ""
    tag: str = ""
    
class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    healthy: bool

    model_config = {
    "from_attributes": True
    }


class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    model_config = {
    "from_attributes": True
}
