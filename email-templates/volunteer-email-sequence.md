# Volunteer Email Sequence Templates

Use these templates in MailerLite to create an automated email sequence for volunteers.

## Setup Instructions

1. Log in to MailerLite
2. Go to **Automations** → **Create automation**
3. Select trigger: **"When subscriber joins a group"**
4. Create a group called **"2025 Volunteers"**
5. Add the emails below as steps with delays between them

---

## Email 1: Confirmation (Immediate)

**Subject:** You're In! Welcome to the Volunteer Team

**Preview text:** Thank you for signing up to volunteer at Central Utah Tree Festival

---

Hi {{name}},

Thank you for signing up to volunteer with Central Utah Tree Festival! We're thrilled to have you join our team.

**What happens next:**
- We'll review your availability and role preferences
- You'll receive your shift assignment within the next 1-2 weeks
- Closer to the event, we'll send detailed instructions for your shift

**Your signup details:**
- Preferred role(s): {{roles}}
- Availability: {{shifts}}

**Quick reminders:**
- Volunteers must be 16+ (those under 18 must volunteer with a guardian)
- Wear comfortable clothes and closed-toe shoes
- You'll receive a volunteer t-shirt on your first day

**Questions?**
Reply to this email or reach us at info@centralutahtreefestival.org

Thank you for helping rural families in Sanpete County access the care their children need. Your time truly makes a difference.

With gratitude,
The Central Utah Tree Festival Team

---

P.S. Follow us on social media for updates!
- Facebook: facebook.com/profile.php?id=61583685786493
- Instagram: @centralutahtreefestival
- TikTok: @central.utah.tree

---

## Email 2: Shift Assignment (Send manually when assigned, or 2 weeks before event)

**Subject:** Your Volunteer Shift is Confirmed!

**Preview text:** Here are the details for your volunteer shift at the festival

---

Hi {{name}},

Great news! We've assigned your volunteer shift for the Central Utah Tree Festival.

**YOUR SHIFT DETAILS:**

📅 **Date:** [DATE]
⏰ **Time:** [TIME]
📍 **Location:** [VENUE ADDRESS]
🎯 **Role:** [ASSIGNED ROLE]

**What to bring:**
- Photo ID
- Water bottle
- Comfortable shoes
- A smile!

**What we provide:**
- Volunteer t-shirt (size {{tshirt}})
- Snacks and refreshments
- Free event admission for you

**Check-in instructions:**
When you arrive, look for the Volunteer Check-In table near [LOCATION]. A team member will get you set up and answer any questions.

**Can't make it?**
We understand life happens. Please let us know ASAP if you need to reschedule by replying to this email.

See you soon!

The Central Utah Tree Festival Team

---

## Email 3: Day-Before Reminder (1 day before shift)

**Subject:** See You Tomorrow! Your Volunteer Shift Reminder

**Preview text:** Quick reminder about your volunteer shift tomorrow

---

Hi {{name}},

Just a friendly reminder that you're volunteering with us tomorrow!

**QUICK REFERENCE:**

📅 **Tomorrow, [DATE]**
⏰ **[TIME]**
📍 **[VENUE ADDRESS]**
🎯 **Role:** [ASSIGNED ROLE]

**Parking:**
[PARKING INSTRUCTIONS]

**Weather note:**
[Weather-appropriate tip if needed]

**Emergency contact:**
If you're running late or have an emergency, text or call: [PHONE NUMBER]

We're so grateful you're giving your time to help families in our community. See you tomorrow!

The Central Utah Tree Festival Team

---

## Email 4: Thank You (1 day after shift)

**Subject:** THANK YOU for Volunteering!

**Preview text:** Your impact at the Central Utah Tree Festival

---

Hi {{name}},

We can't thank you enough for volunteering at the Central Utah Tree Festival!

**YOUR IMPACT:**

Thanks to volunteers like you, we were able to:
- Welcome [X] guests to the festival
- Raise $[AMOUNT] for families in need
- Support [X] families traveling to Primary Children's Hospital

Every hour you gave directly helps a child in Sanpete County access the specialized medical care they need. That's incredible.

**Community Service Hours:**
If you need a community service hours letter, simply reply to this email with:
- Your full name
- Number of hours you volunteered
- Organization/school requesting the letter

We'll send your letter within 3-5 business days.

**Share your experience:**
We'd love to see your photos! Tag us on social media:
- Instagram: @centralutahtreefestival
- Facebook: Central Utah Tree Festival

**Stay connected:**
Want to help again next year? We'd love to have you back! We'll reach out when volunteer signups open for 2026.

From all of us at Central Utah Tree Festival—thank you for being part of something special.

With heartfelt gratitude,
The Central Utah Tree Festival Team

---

## Email 5: Year-Round Engagement (Send 2-3 months after event)

**Subject:** You Made a Difference (Here's Proof!)

**Preview text:** See the families you helped this year

---

Hi {{name}},

A few months ago, you gave your time to volunteer at the Central Utah Tree Festival. We wanted to share what your generosity made possible.

**THE IMPACT OF YOUR SERVICE:**

[Include 1-2 brief, anonymized family stories with permission, e.g.:]

*"Thanks to the Tree Festival, the Martinez family was able to afford gas and meals during their daughter Sofia's three-day hospital stay at Primary Children's. 'We didn't have to choose between being with our sick child and paying our bills,' her mother shared."*

**By the numbers:**
- Families supported: [X]
- Miles of travel covered: [X]
- Meals provided: [X]
- Total raised: $[AMOUNT]

None of this would be possible without volunteers like you.

**Mark your calendar:**
The 2026 Central Utah Tree Festival will be held in December. Volunteer signups open in [MONTH]. We'll send you an invite!

Thank you for being part of our community.

Warmly,
The Central Utah Tree Festival Team

---

## MailerLite Automation Setup Summary

| Email | Trigger/Delay | Notes |
|-------|--------------|-------|
| Email 1 | Immediate | Auto-sends when added to group |
| Email 2 | Manual send | Send when shifts are assigned |
| Email 3 | 1 day before event | Use scheduled send |
| Email 4 | 1 day after event | Use scheduled send |
| Email 5 | 2-3 months after | Optional engagement email |

## Personalization Tags

Replace these placeholders with MailerLite merge tags:
- `{{name}}` → Subscriber's first name
- `{{roles}}` → Custom field for preferred roles
- `{{shifts}}` → Custom field for availability
- `{{tshirt}}` → Custom field for t-shirt size

## Creating Custom Fields in MailerLite

1. Go to **Subscribers** → **Custom fields**
2. Create fields for:
   - `roles` (text)
   - `shifts` (text)
   - `tshirt` (dropdown: S, M, L, XL, 2XL, 3XL)
   - `shift_date` (date)
   - `shift_time` (text)
   - `assigned_role` (text)
