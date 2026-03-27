import { clerkClient } from '@clerk/express'


export const updateRoleToEducator = async (req, res) => {
  try {
    console.log("AUTH:", req.auth);
    console.log("USER ID:", req.auth?.userId);

    const userId = req.auth?.userId;

    if (!userId) {
      return res.json({ success: false, message: "No userId found" });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'educator',
      },
    });

    res.json({ success: true, message: 'You can publish a course now' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};