import { INITIAL_USER } from "../data/mockData";
const USER_STORAGE_KEY = "sipzy_user_session";
const ALL_USERS_KEY = "sipzy_registered_users";
export const authService = {
  getCurrentUser() {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(INITIAL_USER));
      return INITIAL_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  login(email, _password) {
    if (!email || !email.includes("@")) {
      return { success: false, error: "Silakan masukkan alamat email yang valid." };
    }
    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    let users = savedRaw ? JSON.parse(savedRaw) : [INITIAL_USER];
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      const nameFromEmail = email.split("@")[0].replace(".", " ");
      user = {
        id: `usr_${Date.now()}`,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
        email,
        phone: "+62 812-3456-7890",
        location: "Sleman, D.I. Yogyakarta",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        memberId: `SIP-${Math.floor(1e3 + Math.random() * 9e3)}-SLM`,
        memberSince: "November 2026",
        membershipLevel: "Silver",
        points: 250,
        notificationsEnabled: true,
        emailUpdates: true
      };
      users.push(user);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return { success: true, user };
  },
  register(name, email, phone) {
    if (!name.trim()) return { success: false, error: "Nama lengkap wajib diisi." };
    if (!email || !email.includes("@")) return { success: false, error: "Alamat email yang valid wajib diisi." };
    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || "+62 812-0000-0000",
      location: "Sleman, D.I. Yogyakarta",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      memberId: `SIP-${Math.floor(1e3 + Math.random() * 9e3)}-SLM`,
      memberSince: "November 2026",
      membershipLevel: "Bronze",
      points: 150,
      // Bonus sambutan 150 poin
      notificationsEnabled: true,
      emailUpdates: true
    };
    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    const users = savedRaw ? JSON.parse(savedRaw) : [INITIAL_USER];
    users.push(newUser);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },
  updateProfile(updates) {
    const current = this.getCurrentUser();
    if (!current) return null;
    const updated = { ...current, ...updates };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    const savedRaw = localStorage.getItem(ALL_USERS_KEY);
    if (savedRaw) {
      const users = JSON.parse(savedRaw);
      const idx = users.findIndex((u) => u.id === updated.id);
      if (idx !== -1) {
        users[idx] = updated;
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
      }
    }
    return updated;
  },
  updatePoints(newPoints) {
    const current = this.getCurrentUser();
    if (!current) return null;
    let level = current.membershipLevel;
    if (newPoints >= 2e3) level = "Black Diamond";
    else if (newPoints >= 1e3) level = "Gold";
    else if (newPoints >= 400) level = "Silver";
    else level = "Bronze";
    return this.updateProfile({ points: newPoints, membershipLevel: level });
  },
  logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
};
