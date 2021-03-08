import React from 'react'

const FrxLobField = (props) => {
  const {lob} = props;
  
  return (
    <>
    {lob === "Commercial" ? (
        <svg width="106" height="21" viewBox="0 0 106 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="106" height="20" rx="10" fill="#707683"/>
        <path d="M21.7578 11.7227C21.6719 12.6328 21.3359 13.3438 20.75 13.8555C20.1641 14.3633 19.3848 14.6172 18.4121 14.6172C17.7324 14.6172 17.1328 14.457 16.6133 14.1367C16.0977 13.8125 15.6992 13.3535 15.418 12.7598C15.1367 12.166 14.9902 11.4766 14.9785 10.6914V9.89453C14.9785 9.08984 15.1211 8.38086 15.4062 7.76758C15.6914 7.1543 16.0996 6.68164 16.6309 6.34961C17.166 6.01758 17.7832 5.85156 18.4824 5.85156C19.4238 5.85156 20.1816 6.10742 20.7559 6.61914C21.3301 7.13086 21.6641 7.85352 21.7578 8.78711H20.2812C20.2109 8.17383 20.0312 7.73242 19.7422 7.46289C19.457 7.18945 19.0371 7.05273 18.4824 7.05273C17.8379 7.05273 17.3418 7.28906 16.9941 7.76172C16.6504 8.23047 16.4746 8.91992 16.4668 9.83008V10.5859C16.4668 11.5078 16.6309 12.2109 16.959 12.6953C17.291 13.1797 17.7754 13.4219 18.4121 13.4219C18.9941 13.4219 19.4316 13.291 19.7246 13.0293C20.0176 12.7676 20.2031 12.332 20.2812 11.7227H21.7578ZM29.8965 10.457C29.8965 11.293 29.752 12.0273 29.4629 12.6602C29.1738 13.2891 28.7598 13.7734 28.2207 14.1133C27.6855 14.4492 27.0684 14.6172 26.3691 14.6172C25.6777 14.6172 25.0605 14.4492 24.5176 14.1133C23.9785 13.7734 23.5605 13.291 23.2637 12.666C22.9707 12.041 22.8223 11.3203 22.8184 10.5039V10.0234C22.8184 9.19141 22.9648 8.45703 23.2578 7.82031C23.5547 7.18359 23.9707 6.69727 24.5059 6.36133C25.0449 6.02148 25.6621 5.85156 26.3574 5.85156C27.0527 5.85156 27.668 6.01953 28.2031 6.35547C28.7422 6.6875 29.1582 7.16797 29.4512 7.79688C29.7441 8.42188 29.8926 9.15039 29.8965 9.98242V10.457ZM28.4141 10.0117C28.4141 9.06641 28.2344 8.3418 27.875 7.83789C27.5195 7.33398 27.0137 7.08203 26.3574 7.08203C25.7168 7.08203 25.2148 7.33398 24.8516 7.83789C24.4922 8.33789 24.3086 9.04688 24.3008 9.96484V10.457C24.3008 11.3945 24.4824 12.1191 24.8457 12.6309C25.2129 13.1426 25.7207 13.3984 26.3691 13.3984C27.0254 13.3984 27.5293 13.1484 27.8809 12.6484C28.2363 12.1484 28.4141 11.418 28.4141 10.457V10.0117ZM33.2949 5.96875L35.7559 12.5078L38.2109 5.96875H40.127V14.5H38.6504V11.6875L38.7969 7.92578L36.2773 14.5H35.2168L32.7031 7.93164L32.8496 11.6875V14.5H31.373V5.96875H33.2949ZM43.8066 5.96875L46.2676 12.5078L48.7227 5.96875H50.6387V14.5H49.1621V11.6875L49.3086 7.92578L46.7891 14.5H45.7285L43.2148 7.93164L43.3613 11.6875V14.5H41.8848V5.96875H43.8066ZM57.3828 10.6914H53.8789V13.3164H57.9746V14.5H52.3965V5.96875H57.9336V7.16406H53.8789V9.51953H57.3828V10.6914ZM62.3164 11.2129H60.6641V14.5H59.1816V5.96875H62.1816C63.166 5.96875 63.9258 6.18945 64.4609 6.63086C64.9961 7.07227 65.2637 7.71094 65.2637 8.54688C65.2637 9.11719 65.125 9.5957 64.8477 9.98242C64.5742 10.3652 64.1914 10.6602 63.6992 10.8672L65.6152 14.4238V14.5H64.0273L62.3164 11.2129ZM60.6641 10.0234H62.1875C62.6875 10.0234 63.0781 9.89844 63.3594 9.64844C63.6406 9.39453 63.7812 9.04883 63.7812 8.61133C63.7812 8.1543 63.6504 7.80078 63.3887 7.55078C63.1309 7.30078 62.7441 7.17188 62.2285 7.16406H60.6641V10.0234ZM73.1797 11.7227C73.0938 12.6328 72.7578 13.3438 72.1719 13.8555C71.5859 14.3633 70.8066 14.6172 69.834 14.6172C69.1543 14.6172 68.5547 14.457 68.0352 14.1367C67.5195 13.8125 67.1211 13.3535 66.8398 12.7598C66.5586 12.166 66.4121 11.4766 66.4004 10.6914V9.89453C66.4004 9.08984 66.543 8.38086 66.8281 7.76758C67.1133 7.1543 67.5215 6.68164 68.0527 6.34961C68.5879 6.01758 69.2051 5.85156 69.9043 5.85156C70.8457 5.85156 71.6035 6.10742 72.1777 6.61914C72.752 7.13086 73.0859 7.85352 73.1797 8.78711H71.7031C71.6328 8.17383 71.4531 7.73242 71.1641 7.46289C70.8789 7.18945 70.459 7.05273 69.9043 7.05273C69.2598 7.05273 68.7637 7.28906 68.416 7.76172C68.0723 8.23047 67.8965 8.91992 67.8887 9.83008V10.5859C67.8887 11.5078 68.0527 12.2109 68.3809 12.6953C68.7129 13.1797 69.1973 13.4219 69.834 13.4219C70.416 13.4219 70.8535 13.291 71.1465 13.0293C71.4395 12.7676 71.625 12.332 71.7031 11.7227H73.1797ZM76.0742 14.5H74.5977V5.96875H76.0742V14.5ZM82.7773 12.5137H79.4727L78.7812 14.5H77.2402L80.4629 5.96875H81.793L85.0215 14.5H83.4746L82.7773 12.5137ZM79.8887 11.3184H82.3613L81.125 7.7793L79.8887 11.3184ZM87.4766 13.3164H91.3496V14.5H85.9941V5.96875H87.4766V13.3164Z" fill="white"/>
        </svg>
    ) : lob === "Medicare" ? (
        <svg width="106" height="20" viewBox="0 0 106 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="106" height="20" rx="10" fill="#684999"/>
        <path d="M26.2746 5.46875L28.7355 12.0078L31.1906 5.46875H33.1066V14H31.6301V11.1875L31.7766 7.42578L29.257 14H28.1965L25.6828 7.43164L25.8293 11.1875V14H24.3527V5.46875H26.2746ZM40.0508 10.1914H36.5469V12.8164H40.6426V14H35.0645V5.46875H40.6016V6.66406H36.5469V9.01953H40.0508V10.1914ZM42.0496 14V5.46875H44.5691C45.323 5.46875 45.991 5.63672 46.573 5.97266C47.159 6.30859 47.6121 6.78516 47.9324 7.40234C48.2527 8.01953 48.4129 8.72656 48.4129 9.52344V9.95117C48.4129 10.7598 48.2508 11.4707 47.9266 12.084C47.6062 12.6973 47.1473 13.1699 46.5496 13.502C45.9559 13.834 45.2742 14 44.5047 14H42.0496ZM43.532 6.66406V12.8164H44.4988C45.2762 12.8164 45.8719 12.5742 46.2859 12.0898C46.7039 11.6016 46.9168 10.9023 46.9246 9.99219V9.51758C46.9246 8.5918 46.7234 7.88477 46.3211 7.39648C45.9187 6.9082 45.3348 6.66406 44.5691 6.66406H43.532ZM51.6539 14H50.1773V5.46875H51.6539V14ZM60.1859 11.2227C60.1 12.1328 59.7641 12.8438 59.1781 13.3555C58.5922 13.8633 57.8129 14.1172 56.8402 14.1172C56.1605 14.1172 55.5609 13.957 55.0414 13.6367C54.5258 13.3125 54.1273 12.8535 53.8461 12.2598C53.5648 11.666 53.4184 10.9766 53.4066 10.1914V9.39453C53.4066 8.58984 53.5492 7.88086 53.8344 7.26758C54.1195 6.6543 54.5277 6.18164 55.059 5.84961C55.5941 5.51758 56.2113 5.35156 56.9105 5.35156C57.852 5.35156 58.6098 5.60742 59.184 6.11914C59.7582 6.63086 60.0922 7.35352 60.1859 8.28711H58.7094C58.6391 7.67383 58.4594 7.23242 58.1703 6.96289C57.8852 6.68945 57.4652 6.55273 56.9105 6.55273C56.266 6.55273 55.7699 6.78906 55.4223 7.26172C55.0785 7.73047 54.9027 8.41992 54.8949 9.33008V10.0859C54.8949 11.0078 55.059 11.7109 55.3871 12.1953C55.7191 12.6797 56.2035 12.9219 56.8402 12.9219C57.4223 12.9219 57.8598 12.791 58.1527 12.5293C58.4457 12.2676 58.6312 11.832 58.7094 11.2227H60.1859ZM66.4914 12.0137H63.1867L62.4953 14H60.9543L64.177 5.46875H65.507L68.7355 14H67.1887L66.4914 12.0137ZM63.6027 10.8184H66.0754L64.8391 7.2793L63.6027 10.8184ZM73.043 10.7129H71.3906V14H69.9082V5.46875H72.9082C73.8926 5.46875 74.6523 5.68945 75.1875 6.13086C75.7227 6.57227 75.9902 7.21094 75.9902 8.04688C75.9902 8.61719 75.8516 9.0957 75.5742 9.48242C75.3008 9.86523 74.918 10.1602 74.4258 10.3672L76.3418 13.9238V14H74.7539L73.043 10.7129ZM71.3906 9.52344H72.9141C73.4141 9.52344 73.8047 9.39844 74.0859 9.14844C74.3672 8.89453 74.5078 8.54883 74.5078 8.11133C74.5078 7.6543 74.377 7.30078 74.1152 7.05078C73.8574 6.80078 73.4707 6.67188 72.9551 6.66406H71.3906V9.52344ZM82.5828 10.1914H79.0789V12.8164H83.1746V14H77.5965V5.46875H83.1336V6.66406H79.0789V9.01953H82.5828V10.1914Z" fill="white"/>
        </svg>
    ) : lob === "Medicaid" ? (
        <svg width="106" height="20" viewBox="0 0 106 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="106" height="20" rx="10" fill="#F89090"/>
        <path d="M27.798 5.46875L30.259 12.0078L32.7141 5.46875H34.6301V14H33.1535V11.1875L33.3 7.42578L30.7805 14H29.7199L27.2062 7.43164L27.3527 11.1875V14H25.8762V5.46875H27.798ZM41.5742 10.1914H38.0703V12.8164H42.166V14H36.5879V5.46875H42.125V6.66406H38.0703V9.01953H41.5742V10.1914ZM43.573 14V5.46875H46.0926C46.8465 5.46875 47.5145 5.63672 48.0965 5.97266C48.6824 6.30859 49.1355 6.78516 49.4559 7.40234C49.7762 8.01953 49.9363 8.72656 49.9363 9.52344V9.95117C49.9363 10.7598 49.7742 11.4707 49.45 12.084C49.1297 12.6973 48.6707 13.1699 48.073 13.502C47.4793 13.834 46.7977 14 46.0281 14H43.573ZM45.0555 6.66406V12.8164H46.0223C46.7996 12.8164 47.3953 12.5742 47.8094 12.0898C48.2273 11.6016 48.4402 10.9023 48.448 9.99219V9.51758C48.448 8.5918 48.2469 7.88477 47.8445 7.39648C47.4422 6.9082 46.8582 6.66406 46.0926 6.66406H45.0555ZM53.1773 14H51.7008V5.46875H53.1773V14ZM61.7094 11.2227C61.6234 12.1328 61.2875 12.8438 60.7016 13.3555C60.1156 13.8633 59.3363 14.1172 58.3637 14.1172C57.684 14.1172 57.0844 13.957 56.5648 13.6367C56.0492 13.3125 55.6508 12.8535 55.3695 12.2598C55.0883 11.666 54.9418 10.9766 54.9301 10.1914V9.39453C54.9301 8.58984 55.0727 7.88086 55.3578 7.26758C55.643 6.6543 56.0512 6.18164 56.5824 5.84961C57.1176 5.51758 57.7348 5.35156 58.434 5.35156C59.3754 5.35156 60.1332 5.60742 60.7074 6.11914C61.2816 6.63086 61.6156 7.35352 61.7094 8.28711H60.2328C60.1625 7.67383 59.9828 7.23242 59.6937 6.96289C59.4086 6.68945 58.9887 6.55273 58.434 6.55273C57.7895 6.55273 57.2934 6.78906 56.9457 7.26172C56.602 7.73047 56.4262 8.41992 56.4184 9.33008V10.0859C56.4184 11.0078 56.5824 11.7109 56.9105 12.1953C57.2426 12.6797 57.727 12.9219 58.3637 12.9219C58.9457 12.9219 59.3832 12.791 59.6762 12.5293C59.9691 12.2676 60.1547 11.832 60.2328 11.2227H61.7094ZM68.0148 12.0137H64.7102L64.0187 14H62.4777L65.7004 5.46875H67.0305L70.259 14H68.7121L68.0148 12.0137ZM65.1262 10.8184H67.5988L66.3625 7.2793L65.1262 10.8184ZM72.9961 14H71.5195V5.46875H72.9961V14ZM75.0184 14V5.46875H77.5379C78.2918 5.46875 78.9598 5.63672 79.5418 5.97266C80.1277 6.30859 80.5809 6.78516 80.9012 7.40234C81.2215 8.01953 81.3816 8.72656 81.3816 9.52344V9.95117C81.3816 10.7598 81.2195 11.4707 80.8953 12.084C80.575 12.6973 80.116 13.1699 79.5184 13.502C78.9246 13.834 78.243 14 77.4734 14H75.0184ZM76.5008 6.66406V12.8164H77.4676C78.2449 12.8164 78.8406 12.5742 79.2547 12.0898C79.6727 11.6016 79.8855 10.9023 79.8934 9.99219V9.51758C79.8934 8.5918 79.6922 7.88477 79.2898 7.39648C78.8875 6.9082 78.3035 6.66406 77.5379 6.66406H76.5008Z" fill="white"/>
        </svg>
    ) : lob === "Exchange" ? (
        <svg width="106" height="21" viewBox="0 0 106 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.5" width="106" height="20" rx="10" fill="#F4AF64"/>
        <path d="M27.7695 10.6914H24.2656V13.3164H28.3613V14.5H22.7832V5.96875H28.3203V7.16406H24.2656V9.51953H27.7695V10.6914ZM32.5039 9.05078L34.2969 5.96875H36.0078L33.4297 10.1992L36.0664 14.5H34.3379L32.5039 11.3711L30.6641 14.5H28.9414L31.584 10.1992L29 5.96875H30.7109L32.5039 9.05078ZM43.5195 11.7227C43.4336 12.6328 43.0977 13.3438 42.5117 13.8555C41.9258 14.3633 41.1465 14.6172 40.1738 14.6172C39.4941 14.6172 38.8945 14.457 38.375 14.1367C37.8594 13.8125 37.4609 13.3535 37.1797 12.7598C36.8984 12.166 36.752 11.4766 36.7402 10.6914V9.89453C36.7402 9.08984 36.8828 8.38086 37.168 7.76758C37.4531 7.1543 37.8613 6.68164 38.3926 6.34961C38.9277 6.01758 39.5449 5.85156 40.2441 5.85156C41.1855 5.85156 41.9434 6.10742 42.5176 6.61914C43.0918 7.13086 43.4258 7.85352 43.5195 8.78711H42.043C41.9727 8.17383 41.793 7.73242 41.5039 7.46289C41.2188 7.18945 40.7988 7.05273 40.2441 7.05273C39.5996 7.05273 39.1035 7.28906 38.7559 7.76172C38.4121 8.23047 38.2363 8.91992 38.2285 9.83008V10.5859C38.2285 11.5078 38.3926 12.2109 38.7207 12.6953C39.0527 13.1797 39.5371 13.4219 40.1738 13.4219C40.7559 13.4219 41.1934 13.291 41.4863 13.0293C41.7793 12.7676 41.9648 12.332 42.043 11.7227H43.5195ZM51.623 14.5H50.1465V10.709H46.332V14.5H44.8496V5.96875H46.332V9.51953H50.1465V5.96875H51.623V14.5ZM58.2617 12.5137H54.957L54.2656 14.5H52.7246L55.9473 5.96875H57.2773L60.5059 14.5H58.959L58.2617 12.5137ZM55.373 11.3184H57.8457L56.6094 7.7793L55.373 11.3184ZM68.2461 14.5H66.7637L62.9609 8.44727V14.5H61.4785V5.96875H62.9609L66.7754 12.0449V5.96875H68.2461V14.5ZM76.5371 13.3926C76.2285 13.7949 75.8008 14.0996 75.2539 14.3066C74.707 14.5137 74.0859 14.6172 73.3906 14.6172C72.6758 14.6172 72.043 14.4551 71.4922 14.1309C70.9414 13.8066 70.5156 13.3438 70.2148 12.7422C69.918 12.1367 69.7637 11.4316 69.752 10.627V9.95898C69.752 8.66992 70.0605 7.66406 70.6777 6.94141C71.2949 6.21484 72.1562 5.85156 73.2617 5.85156C74.2109 5.85156 74.9648 6.08594 75.5234 6.55469C76.082 7.02344 76.418 7.69922 76.5312 8.58203H75.0781C74.9141 7.55469 74.3184 7.04102 73.291 7.04102C72.627 7.04102 72.1211 7.28125 71.7734 7.76172C71.4297 8.23828 71.252 8.93945 71.2402 9.86523V10.5215C71.2402 11.4434 71.4336 12.1602 71.8203 12.6719C72.2109 13.1797 72.752 13.4336 73.4434 13.4336C74.2012 13.4336 74.7402 13.2617 75.0605 12.918V11.248H73.3027V10.123H76.5371V13.3926ZM83.1523 10.6914H79.6484V13.3164H83.7441V14.5H78.166V5.96875H83.7031V7.16406H79.6484V9.51953H83.1523V10.6914Z" fill="white"/>
        </svg>
    ):null}
    </>
  )
}

export default FrxLobField