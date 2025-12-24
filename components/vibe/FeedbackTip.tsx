import Link from 'next/link'

export function FeedbackTip() {
  return (
    <div className="mt-8 rounded-xl border border-[var(--color-divider,var(--color-gray-200))] bg-[var(--color-bg-soft,var(--color-gray-50))] p-4 text-sm leading-relaxed text-gray-600 dark:border-[var(--color-gray-700)] dark:text-gray-400">
      <p className="mb-3">
        <strong className="mr-1 font-semibold text-gray-900 dark:text-gray-100">
          反馈与建议：
        </strong>
        发现内容有误或想补充？欢迎在下方评论区留言，或到{' '}
        <Link
          href="https://github.com/datawhalechina/vibe-vibe/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--color-brand-primary)] underline underline-offset-2 hover:text-[var(--color-brand-secondary)]"
        >
          GitHub 提 Issue
        </Link>
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold text-gray-900 dark:text-gray-100">点我给个 Star 吧：</span>
        <div className="inline-flex h-[30px] items-center overflow-hidden rounded-md bg-white dark:bg-[#202127]">
          <iframe
            src="https://ghbtns.com/github-btn.html?user=datawhalechina&repo=vibe-vibe&type=star&count=false&size=large"
            title="GitHub"
            height="30"
            width="120"
            className="block border-0 bg-transparent dark:filter-[invert(0.9)_hue-rotate(180deg)_saturate(0.9)_brightness(1.05)_contrast(0.95)]"
          />
        </div>
      </div>
    </div>
  )
}
