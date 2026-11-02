import { User } from '../types';
import { INITIAL_USER } from '../data/mockData';

const USER_STORAGE_KEY = 'sipzy_user_session';
const ALL_USERS_KEY = 'sipzy_registered_users';
const DEMO_SEEDED_KEY = 'sipzy_demo_seeded';

export const authService = {
  getCurrentUser(): User | null {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
      // Seed the demo user only on the very first visit, so reviewers don't
      // start with a blank screen. After an explicit logout, stay logged out.
      if (localStorage.getItem(DEMO_SEEDED_KEY)) return null;
      localStorage.setItem(DEMO_SEEDED_KEY, '1');
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  login(email: string, _password?: string): { success: boolean; user?: User; error?: string } {
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Check if user exists in saved users list, or match INITIAL_USER, or create session
    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    let users: User[] = savedRaw ? JSON.parse(savedRaw) : [INITIAL_USER];

    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Allow seamless login with new email
      const nameFromEmail = email.split('@')[0].replace('.', ' ');
      user = {
        id: `usr_${Date.now()}`,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email,
        phone: '+62 812-0000-1234',
        location: 'Jakarta, Indonesia',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        memberId: `SIP-${Math.floor(1000 + Math.random() * 9000)}-JKT`,
        memberSince: 'November 2026',
        membershipLevel: 'Silver',
        points: 250, // Welcome bonus points!
        notificationsEnabled: true,
        emailUpdates: true,
      };
      users.push(user);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },

  register(name: string, email: string, phone: string): { success: boolean; user?: User; error?: string } {
    if (!name.trim()) return { success: false, error: 'Name is required' };
    if (!email || !email.includes('@')) return { success: false, error: 'Valid email is required' };

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+62 812-0000-0000',
      location: 'Jakarta, Indonesia',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      memberId: `SIP-${Math.floor(1000 + Math.random() * 9000)}-JKT`,
      memberSince: 'November 2026',
      membershipLevel: 'Bronze',
      points: 150, // 150 Welcome bonus points
      notificationsEnabled: true,
      emailUpdates: true,
    };

    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    const users: User[] = savedRaw ? JSON.parse(savedRaw) : [INITIAL_USER];
    users.push(newUser);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

    return { success: true, user: newUser };
  },

  updateProfile(updates: Partial<User>): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));

    // Update in all users too
    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    if (savedRaw) {
      const users: User[] = JSON.parse(savedRaw);
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        users[idx] = updated;
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
      }
    }
    return updated;
  },

  updatePoints(newPoints: number): User | null {
    const current = this.getCurrentUser();
    if (!current) return null;

    // Recalculate tier based on total points
    let level = current.membershipLevel;
    if (newPoints >= 2000) level = 'Black Diamond';
    else if (newPoints >= 1000) level = 'Gold';
    else if (newPoints >= 400) level = 'Silver';
    else level = 'Bronze';

    return this.updateProfile({ points: newPoints, membershipLevel: level });
  },

  logout(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};
