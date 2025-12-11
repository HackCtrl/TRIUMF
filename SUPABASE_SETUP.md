# Настройка Supabase для проекта ТРИУМФ

## Шаг 1: Создать проект в Supabase

1. Перейдите на https://supabase.com/
2. Зарегистрируйтесь (если ещё нет аккаунта)
3. Нажмите "New Project"
4. Выберите organization и введите название (например, "triumf-boxing")
5. Установите пароль для базы данных
6. Выберите регион (Европа рекомендуется для РФ)
7. Создайте проект (ждите 2-3 минуты)

## Шаг 2: Создать таблицу через SQL

1. В Supabase Dashboard откройте **SQL Editor** (слева в меню)
2. Нажмите **New Query**
3. Скопируйте код ниже и выполните:

```sql
create extension if not exists "pgcrypto";

create table public.applications (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  direction text,
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.applications enable row level security;

create policy "allow public insert" on public.applications
  for insert with check (true);

create policy "allow service role all" on public.applications
  for all using (true) with check (true);
```

4. Нажмите **Run** — таблица будет создана

## Шаг 3: Получить ключи для Vercel

1. В Supabase перейдите **Settings** → **API** (слева внизу)
2. Найдите поля:
   - **Project URL** — скопируйте (выглядит как `https://xyzabc123.supabase.co`)
   - **Service Role Key** (внизу, в секции "Keys") — скопируйте (начинается с `eyJhbGc...`)

## Шаг 4: Добавить переменные в Vercel

1. Откройте https://vercel.com/ и перейдите в ваш проект
2. **Settings** → **Environment Variables**
3. Добавьте три переменные:

| Ключ | Значение | Примечание |
|------|----------|-----------|
| `SUPABASE_URL` | `https://xyzabc123.supabase.co` | Скопировано из Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Service Role Key из Supabase (ХРАНИТЬ В СЕКРЕТЕ!) |
| `ADMIN_PASS` | `301062Ki` | Пароль для входа в админ-панель |

4. Для каждой переменной установите:
   - Environment: **Production, Preview, Development**
   - Нажмите **Save**

## Шаг 5: Деплой

1. Закоммитьте изменения локально:
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

2. Vercel автоматически задеплоит новую версию (или нажмите **Deploy** в Vercel Dashboard)

## Шаг 6: Тестирование

1. Откройте ваш сайт: https://triumf-nu.vercel.app/
2. Отправьте тестовую заявку через форму
3. Откройте админ-панель (**Admin** кнопка внизу справа, пароль `301062Ki`)
4. Нажмите **Обновить** — должна появиться ваша заявка

Если заявка не появляется:
- Откройте DevTools (F12) → Network → посмотрите запрос к `/api/applications` (должен быть статус 200 или 201)
- Проверьте Console на ошибки
- Убедитесь, что переменные окружения добавлены в Vercel (обновите страницу после добавления)

---

**Готово!** Теперь заявки будут сохраняться централизованно в Supabase и видны всем администраторам.
