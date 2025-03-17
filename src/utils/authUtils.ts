
/**
 * Calculate password strength based on various criteria
 * @param password The password to evaluate
 * @returns A number from 0 to 100 representing password strength
 */
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 25;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) strength += 25; // Uppercase
  if (/[0-9]/.test(password)) strength += 25; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) strength += 25; // Special chars
  
  return strength;
};
