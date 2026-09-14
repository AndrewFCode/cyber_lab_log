function codeText(block: Element) {
  return block.querySelector('pre')?.textContent ?? '';
}

function copyWithSelection(block: Element) {
  const pre = block.querySelector('pre');
  if (!pre) return false;

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(pre);
  selection?.removeAllRanges();
  selection?.addRange(range);

  const ok = document.execCommand('copy');
  selection?.removeAllRanges();
  return ok;
}

function copyWithTextarea(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.opacity = '0';
  document.body.append(textarea);
  textarea.focus();
  textarea.select();
  const ok = document.execCommand('copy');
  textarea.remove();
  return ok;
}

async function writeClipboard(block: Element) {
  const text = codeText(block);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permissions can deny Clipboard while still allowing execCommand.
  }

  if (copyWithSelection(block)) return true;
  return copyWithTextarea(text);
}

function markCopied(button: HTMLButtonElement, ok: boolean) {
  const original = 'Copy';
  button.textContent = ok ? 'Copied' : 'Failed';
  button.setAttribute('aria-label', ok ? 'Copied' : 'Copy failed');
  window.setTimeout(() => {
    button.textContent = original;
    button.setAttribute('aria-label', 'Copy code');
  }, 1600);
}

async function onCopy(button: HTMLButtonElement) {
  const block = button.closest('.code-block');
  if (!block) return;
  const ok = await writeClipboard(block);
  markCopied(button, ok);
}

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest('.copy-btn');
  if (button instanceof HTMLButtonElement) {
    void onCopy(button);
  }
});
