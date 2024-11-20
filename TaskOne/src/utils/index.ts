export function getInitials(fullName: string): string {
    const names = fullName.trim().split(' ');
    const initials = names.map((name) => name.charAt(0).toUpperCase()).join('');
    return initials;
  }
  