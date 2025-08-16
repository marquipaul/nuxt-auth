import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse);

  const user = await db.query.users.findFirst({
    where: eq(tables.users.email, body.email)
  });

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  const isValidPassword = await verifyPassword(user.password, body.password);
  if (!isValidPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' });
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name
    },
    lastLoggedIn: new Date()
  });

  return { success: true }
});
