import type {
  AndroidTVPlusCardConfig,
  AndroidTVPlusEntity,
  AndroidTVPlusTarget,
} from './types';

/**
 * Normalise the card's configured TVs into a de-duplicated, ordered list.
 * The default `entity` comes first and inherits the card-level `media_player`,
 * `apps` and `text_mode`; extra `entities` keep their own overrides. Anything
 * that is not a `remote.*` entity, or repeats an earlier entry, is dropped.
 */
export function resolveTargets(
  config: AndroidTVPlusCardConfig,
): AndroidTVPlusTarget[] {
  const seen = new Set<string>();
  const out: AndroidTVPlusTarget[] = [];
  const all: AndroidTVPlusEntity[] = [config.entity, ...(config.entities ?? [])];
  for (const item of all) {
    const target: AndroidTVPlusTarget =
      typeof item === 'string' ? { entity: item } : { ...item };
    if (!target.entity?.startsWith('remote.') || seen.has(target.entity)) {
      continue;
    }
    seen.add(target.entity);
    if (target.entity === config.entity) {
      target.media_player ??= config.media_player;
      target.text_mode ??= config.text_mode;
      target.apps ??= config.apps;
    }
    out.push(target);
  }
  return out;
}

/**
 * The additional `remote.*` entities to offer in the editor: every entity that
 * is either already configured or present in the state machine, excluding the
 * primary TV, each once. Order is left to the caller (the editor sorts by
 * friendly name).
 */
export function discoverRemotes(
  primary: string,
  configured: string[],
  allEntityIds: string[],
): string[] {
  const seen = new Set<string>([primary]);
  const out: string[] = [];
  for (const entity of [...configured, ...allEntityIds]) {
    if (!entity.startsWith('remote.') || seen.has(entity)) {
      continue;
    }
    seen.add(entity);
    out.push(entity);
  }
  return out;
}
