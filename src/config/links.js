// Email obfuscated against naive scrapers — assembled at runtime, not present in source as a single string
const EMAIL_USER = 'bleslautaro'
const EMAIL_DOMAIN = 'gmail.com'
const EMAIL = `${EMAIL_USER}@${EMAIL_DOMAIN}`

// Centralized personal links — update here, reflects everywhere
export const LINKS = {
  github: 'https://github.com/Bleskz',
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  discord: 'Bleskz',
}
