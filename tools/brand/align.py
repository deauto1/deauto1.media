import subprocess,re,json,sys
S={
"ba1":["وش هو دي اوتو؟","دي اوتو، أكثر من مجرد اسم.","هوية تجمع شغف السيارات، مع المعرفة.","أربعطعش جزء، من تحت الكبوت، لين الكفرات.","نشرحها لك ببساطة، لين تفهم سيارتك صح.","دي اوتو. ما نعلمك، إحنا نفهمك."],
"ba2":["تسوق سيارتك كل يوم.","بس تعرف وش يصير تحت رجلك لما تدعس؟","أغلبنا ما يعرف، وهذا طبيعي.","عشان كذا جا دي اوتو. نشرح بلغة بسيطة، بدون تعقيد، لين تفهم سيارتك، وتتكلم عنها بثقة.","دي اوتو. ما نعلمك، إحنا نفهمك."],
"ba3":["وش تستلم لما تشتري جزء؟","ملف بي دي اف، تحمّله وتقراه من جوالك، من ثلطعش إلى ستة وعشرين صفحة.","ومعه نسخة مبسّطة، ثلاث صفحات تلخّص لك الجزء كله.","وداخل كل جزء: رسومات توضيحية، ومصطلحات بلغة سهلة، ومعلومات بتبهرك.","دي اوتو. الرابط في البايو."],
"ba4":["أربعطعش جزء، كل جزء عالم.","المحرك، القير، التيربو، التعليق، الفرامل، الكفرات، البرمجة، والسباقات. من تحت الكبوت، لين الكفرات.","اختار اللي يهمك.","دي اوتو. الرابط في البايو."],
"ba5":["دي اوتو، لمين؟","لعاشق السيارات. لصاحب أول سيارة. للي يبي يعدّل صح. وللي يبي يفهم كلام الميكانيكي.","يعني، لك أنت.","دي اوتو. ما نعلمك، إحنا نفهمك."],
"ba6":["فيه فرق، بين تتعلّم، وتفهم.","التعليم يحفّظك.","الفهم يخليك واثق.","وإحنا اخترنا الفهم.","دي اوتو. ما نعلمك، إحنا نفهمك."],
"ba7":["أول مرة مع دي اوتو؟","ابدأ من هنا: الجزء الأول، كيف تشتغل السيارة.","وبعدها اختار اللي يهمك. المحرك؟ التيربو؟ الفرامل؟ القرار لك.","وخصم الافتتاح، ينتهي ستة وعشرين نوفمبر.","دي اوتو. الرابط في البايو."],
"be1":["What is Dee Auto?","More than a name.","An identity that brings car passion together with knowledge.","Fourteen chapters. From under the hood, to the tires.","Explained simply.","Dee Auto. Because knowledge is power, and cars are passion."],
"be2":["So what do you actually get?","A real guide. A PDF you read right on your phone.","Plus Made Easier: the short version, with a quick quiz.","Clear visuals. Plain, friendly English. No jargon walls.","Dee Auto. Link in bio."],
"be3":["Fourteen chapters. One world.","The engine. The transmission. Turbos. Suspension. Brakes. Tires. Tuning. Racing. And more.","Start with Chapter One. Out now, in English.","Dee Auto. Link in bio."],
"be4":["Who is Dee Auto for?","Car lovers. First-car owners. Future modders. Anyone who wants to really get it.","So... you.","Dee Auto. Because knowledge is power, and cars are passion."]}
def w(s):  # weight: letters + punctuation pauses
    return len(re.sub(r"[^\w]","",s))+3*len(re.findall(r"[.،,؟?:!]",s))
for id,segs in S.items():
    f=f"baudio/{id}.mp3"
    dur=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
    log=subprocess.run(["ffmpeg","-hide_banner","-i",f,"-af","silencedetect=noise=-35dB:d=0.15","-f","null","-"],capture_output=True,text=True).stderr
    ss=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",log)]; se=[float(x) for x in re.findall(r"silence_end: ([\d.]+)",log)]
    sil=[(a,b) for a,b in zip(ss,se) if a>0.3 and b<dur-0.3]
    head=se[0] if ss and ss[0]<0.05 else 0; tail=ss[-1] if ss and se[-1]>=dur-0.05 else dur
    W=[w(s) for s in segs]; tot=sum(W); exp=[]; c=0
    for k in W[:-1]: c+=k; exp.append(head+(tail-head)*c/tot)
    # DP monotonic assignment of len(exp) boundaries to silences
    n,m=len(exp),len(sil); INF=1e9
    f2=[[INF]*(m+1) for _ in range(n+1)]; bk=[[0]*(m+1) for _ in range(n+1)]
    for j in range(m+1): f2[0][j]=0
    for i in range(1,n+1):
        for j in range(i,m+1):
            a,b=sil[j-1]; cost=abs((a+b)/2-exp[i-1])-0.8*(b-a)
            best=min(range(i-1,j),key=lambda q:f2[i-1][q]); f2[i][j]=f2[i-1][best]+cost; bk[i][j]=best
    j=min(range(n,m+1),key=lambda q:f2[n][q]); pick=[]
    for i in range(n,0,-1): pick.append(sil[j-1]); j=bk[i][j]
    pick=pick[::-1]
    starts=[0]+[max(0,b-0.12) for a,b in pick]
    json.dump({"dur":dur,"tail":tail,"starts":starts},open(f"baudio/{id}.json","w"))
    print(id,round(dur,2),"exp",[round(x,2) for x in exp],"pick",[round(b,2) for a,b in pick])
