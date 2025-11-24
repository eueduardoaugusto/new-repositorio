import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET);
const alg = "HS256";

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function decrypt(session = "") {
  try {
    const { payload } = await jwtVerify(session, secretKey, {
      algorithms: [alg],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session:", error.message);
    return null;
  }
}

export async function createSession(res, userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await encrypt({ userId, expiresAt });

  return res.cookie("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    expires: expiresAt,
  });
}
