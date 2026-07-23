// src/components/layout/PageHeader.tsx

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="bg-parchment px-6 pt-36 pb-16 text-center md:px-10 md:pt-44 md:pb-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5">
        <span className="font-body text-crimson-bright text-xs font-bold tracking-widest uppercase md:text-sm">
          {eyebrow}
        </span>
        <h1 className="font-display text-ink text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="font-body text-stone max-w-2xl text-lg leading-relaxed md:text-xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

// type PageHeaderProps = {
//   eyebrow: string;
//   title: string;
//   description?: string;
// };

// export default function PageHeader({
//   eyebrow,
//   title,
//   description,
// }: PageHeaderProps) {
//   return (
//     <section className="bg-parchment px-6 pt-36 pb-16 text-center md:px-10 md:pt-44 md:pb-20">
//       <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
//         <span className="font-body text-crimson-bright text-sm font-semibold tracking-widest uppercase">
//           {eyebrow}
//         </span>
//         <h1 className="font-display text-ink text-4xl font-semibold md:text-5xl">
//           {title}
//         </h1>
//         {description && (
//           <p className="font-body text-stone text-base md:text-lg">
//             {description}
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }
