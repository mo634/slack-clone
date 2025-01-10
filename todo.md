1.make sure no one except admin can add channel
2.create form  
 create input field (8-12) required and controlled
btn(create)
make sure name channel is - only and no spaces
create handle close
clear name input field on close
set isopen ->false

backend
createChannel -> mutation type
1.get user id
2.get member
3.if the member not admin throw error "unauthorized"
4.start to insert cahnnel (name , worksapce id )

use create channel
and creat hook to create channel

get hook mutaion and oending
start handel submit
