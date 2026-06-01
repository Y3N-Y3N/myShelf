from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# returns a hashed password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# returns whether the given password matches the hashed one
def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    return pwd_context.verify(
        plain_password,
        hashed_password
    )