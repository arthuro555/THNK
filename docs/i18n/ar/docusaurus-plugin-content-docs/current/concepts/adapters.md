---
description: تعلم ما هي المحولات وكيف يمكنها أن تساعدك!
sidebar_position: 2
---

# المحولات

إن THNK في حد ذاتها لا تهتم بالشبكة نفسها، بل تهتم بتعدد اللاعبين فقط. ومن المفارقات، مع ذلك، فإن الملحق الأساسي لـ THNK يسمح لك بلعب لعبتك في اللعب الفردي فقط. إذا كنت ترغب في اللعب جماعيًا، فسيتعين عليك توصيل _محول_ إلى THNK.

يخبر محول THNK كيفية التواصل مع الخوادم أو العملاء بطريقة معينة. نظريًا، يمكنك بناء واحد خاص بك عن طريق JavaScript، ولكن THNK يوفر بعض ملحقات المحولات الرسمية التي يجب أن تغطي كل احتياجاتك.

## محول P2P

:::warning

P2P غير مخصص للألعاب كثيفة اللاعبين! إنه يسرب عنوان بروتوكول إنترنت المستخدم، وهذا بسبب _التصميم_. يجب أن تنظر إلى P2P دائمًا كنوع من _الشبكات المحلية_ التي يمكن أن تعمل عبر الإنترنت - يمكن استخدامه للاتصال بالأصدقاء موثوقين واللعب معًا. ولكن يجب عليك _ألا_ تستخدمه للاتصال بالكثير من الغرباء.

:::

يسمح محول P2P ببساطة باستضافة اللعبة المزودة بـ THNK على اتصال P2P الخاص بك، والاتصال بالخوادم باستخدام معرف P2P الخاص بها.

لاستخدامه، تحتاج أولًا إلى توصيل لعبتك بخادم وسيط. والأمر متروك لك فيما إذا كنت تريد استخدام الافتراضي أو تريد استخدام واحد مخصص - THNK يعمل مع أيٍ منهما. بعد ذلك، يمكنك استخدام الإجراءات لاستضافة خادم. عند استضافة الخادم، قم بإعطاء طريقة لنسخ معرّفات P2P، مع كائن إدخال النص مثلًا. وفي النهاية، يمكنك استخدام إجراء الاتصال للاتصال كعميل إلى خادم P2P باستخدام معرف الخادم.

## محول Geckos.io

يُعَد Geckos.io حلًا للاتصال الشبكي يسمح بإقامة اتصالات مباشرة بين الخادم والعميل. هذه الاتصالات سريعة وآمنة لـ UDP، مثالية لكافة أنواع الألعاب. وهو مدعوم بنفس التقنية التي تدعمها P2P: WebRTC.

هذا المحول مثالي للبنية حيث تتصل بالخادم (اللعب الجماعي في الألعاب المشابهة لـ Minecraft مثلًا) وليس بصديق للعب معه مباشرةً (اللعب الجماعي في الألعاب المشابهة لـ Among Us مثلًا).

## محولات مخطط لها

وفيما يلي قائمة بالمحولات المخطط لها في المستقبل:

- تقسيم الشاشة
- سحابة THNK

لا تتردد في [تقديم اقتراحات أخرى](https://github.com/arthuro555/THNK/issues/new)!