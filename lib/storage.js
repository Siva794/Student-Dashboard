function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

// ✅ Session
export function saveSession(session) {
  try {
    localStorage.setItem("session", JSON.stringify(session || {}));
  } catch {}
}

export function getSession() {
  try {
    const data = localStorage.getItem("session");
    return data ? safeParse(data) || {} : {};
  } catch {
    return {};
  }
}

// ✅ App Data
export function saveData(data) {
  try {
    localStorage.setItem("appData", JSON.stringify(data || {}));
  } catch {}
}

export function getData() {
  try {
    const data = localStorage.getItem("appData");
    return data ? safeParse(data) : null;
  } catch {
    return null;
  }
}

// ✅ NEW: Optional Class Selections
export function saveOptionalSelections(data) {
  try {
    localStorage.setItem(
      "optionalSlots",
      JSON.stringify(data || {})
    );
  } catch {}
}

export function getOptionalSelections() {
  try {
    const data = localStorage.getItem("optionalSlots");
    return data ? safeParse(data) || {} : {};
  } catch {
    return {};
  }
}

// ✅ Clear everything
export function clearStorage() {
  try {
    localStorage.removeItem("session");
    localStorage.removeItem("appData");
    localStorage.removeItem("optionalSlots"); // 🔥 added
  } catch {}
}

// OPTIONAL CLASS OVERRIDES
export function saveOverrides(data) {
  try {
    localStorage.setItem("optionalOverrides", JSON.stringify(data || {}));
  } catch {}
}

export function getOverrides() {
  try {
    const data = localStorage.getItem("optionalOverrides");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}