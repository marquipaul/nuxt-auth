import { z } from 'zod/v4';
import { id } from 'zod/v4/locales';

const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(1, 'Name is required').max(255, 'Name must be at most 255 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, registerSchema.parse);
  const hashedPassword = await hashPassword(body.password);

  const [user] = await db.insert(tables.users).values({
    email: body.email,
    name: body.name,
    password: hashedPassword
  }).returning();

  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name
    },
    lastLoggedIn: new Date()
  });

  return { success: true }
});
