import { supabase } from "./supbaseClient"

export async function syncUserToSupabase(user) {
  const { id, emailAddresses, firstName, lastName } = user
  const email = emailAddresses?.[0]?.emailAddress || null
  const full_name = `${firstName || ''} ${lastName || ''}`.trim()

  const { data, error } = await supabase
    .from('profiles')
    .insert(
      {
        id,
        email : user.primaryEmailAddress.emailAddress, 
        full_name :  user.fullName,
      },
      { onConflict: 'id' } // if the user exists, update it
    )

  if (error) {
    console.error('❌ Error syncing user to Supabase:', error.message)
  } else {
    console.log('✅ User synced to Supabase:', data)

  }
}
