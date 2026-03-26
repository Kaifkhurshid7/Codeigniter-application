<?php

declare(strict_types=1);

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\TeacherModel;
use App\Models\UserModel;

final class DataController extends BaseController
{
    public function users(): void
    {
        self::json(['data' => (new UserModel())->all()]);
    }

    public function teachers(): void
    {
        self::json(['data' => (new TeacherModel())->all()]);
    }
}
