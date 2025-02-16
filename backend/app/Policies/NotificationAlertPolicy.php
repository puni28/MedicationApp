<?php

namespace App\Policies;

use App\Models\User;
use App\Models\NotificationAlert;

class NotificationAlertPolicy
{
    public function view(User $user, NotificationAlert $notificationAlert)
    {
        return $user->id === $notificationAlert->user_id;
    }

    public function create(User $user)
    {
        return true;
    }

    public function update(User $user, NotificationAlert $notificationAlert)
    {
        return $user->id === $notificationAlert->user_id;
    }

    public function delete(User $user, NotificationAlert $notificationAlert)
    {
        return $user->id === $notificationAlert->user_id;
    }

    public function refill(User $user, NotificationAlert $notificationAlert)
    {
        return $user->id === $notificationAlert->user_id;
    }

    public function reminders(User $user, NotificationAlert $notificationAlert)
    {
        return $user->id === $notificationAlert->user_id;
    }
} 